const express = require("express");
// var cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = 80;

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const {
  header,
  body,
  validationResult,
  matchedData,
} = require("express-validator");

app.use(express.json());
// app.use(cors());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const { rateLimit } = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

const mongoDB = "mongodb://127.0.0.1:27017/todo-backend";
var connectWithRetry = async function () {
  try {
    await mongoose.connect(mongoDB);
    console.log("successfully connected to mongodb");
  } catch (err) {
    console.error("Failed to connect to mongo on startup - retrying in 5 sec");
    setTimeout(connectWithRetry, 5000);
  }
};
connectWithRetry();

const TaskSchema = new mongoose.Schema({
  key: String,
  name: String,
  date: String,
  priority: String,
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  todolist: [TaskSchema],
});

function generateAccessToken(email) {
  return jwt.sign({ email: email }, process.env.TOKEN_SECRET, {
    expiresIn: "14d",
  });
}

// Compile model from schema
const User = mongoose.model("Users", UserSchema);

function authenticateToken(req, res, next) {
  const token =
    req.cookies && req.cookies["token"] && req.cookies["token"].split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

app.post(
  "/api/create-account",
  body("name").notEmpty().trim().escape().withMessage("invalid name"),
  body("email")
    .notEmpty()
    .isEmail()
    .toLowerCase()
    .withMessage("This is not a valid email")
    .custom(async (value) => {
      const count = await User.find({ email: value }).countDocuments();
      if (count != 0) {
        throw new Error("This email already belongs to an account");
      }
    }),
  body("password").notEmpty().withMessage("This password is too weak"),
  body("password_confirmation")
    .notEmpty()
    .custom((value, { req }) => {
      return value == req.body.password;
    })
    .withMessage("Passwords do not match"),
  async function (req, res) {
    if (mongoose.connection.readyState != 1) {
      return res.status(500).send({
        errors: {
          msg: "database error",
        },
      });
    }

    const result = validationResult(req);
    const data = matchedData(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }

    try {
      bcrypt.hash(data.password, 10, async function (err, hash) {
        let newUser = new User({
          username: data.username,
          email: data.email,
          password: hash,
          todolist: Array(0),
        });

        await newUser.validate();
        let result = await newUser.save();

        if (result != newUser) {
          throw new Error("db error"); // TODO: better error validation here
        }

        console.log(`created user ${data.email}`);
        const token = generateAccessToken(data.email);
        // return res.json(token);
        return res
          .status(201)
          .cookie("token", "Bearer " + generateAccessToken(data.email), {
            sameSite: "lax",
            expires: new Date(Date.now() + 2 * 7 * 24 * 60 * 60 * 1000),
          })
          .json({ message: "success" });
      });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
);

app.post(
  "/api/login",
  body("email")
    .notEmpty()
    .isEmail()
    .toLowerCase()
    .custom(async (value) => {
      const count = await User.find({ email: { $eq: value } }).countDocuments();
      if (count == 0) {
        throw new Error("No account exists with this email!");
      }
    }),
  body("password").notEmpty(),
  async function (req, res) {
    if (mongoose.connection.readyState != 1) {
      return res.status(500).send({
        errors: {
          msg: "database error",
        },
      });
    }

    const result = validationResult(req);
    const data = matchedData(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }

    let user = await User.findOne({ email: { $eq: data.email } }).lean();
    if (user == null) {
      return res.status(422).json({ errors: "user does not exist" });
    }

    bcrypt.compare(data.password, user.password, function (err, result) {
      if (result == true) {
        return res
          .status(201)
          .cookie("token", "Bearer " + generateAccessToken(user.email), {
            expires: new Date(Date.now() + 2 * 7 * 24 * 60 * 60 * 1000),
          })
          .json({ message: "success" });
      }
      return res
        .status(422)
        .send({ errors: [{ path: "password", msg: "Incorrect password" }] });
    });
  }
);

app.get("/api/get-todo", authenticateToken, async function (req, res) {
  const user = await User.findOne({ email: { $eq: req.user.email } }).exec();
  return res.json(user.todolist);
});

app.post(
  "/api/add-todo",
  authenticateToken,
  body("key").notEmpty().isUUID(),
  body("name").notEmpty().escape().isString(),
  body("date").isISO8601().optional(),
  // body("priority").escape().isString().optional(),
  async function (req, res) {
    const result = validationResult(req);
    const data = matchedData(req);
    if (!result.isEmpty()) {
      return res.status(422).send({ errors: result.array() });
    }

    const user = await User.findOne({ email: { $eq: req.user.email } }).exec();
    let newItem = {
      key: data.key,
      name: data.name,
      date: data.date,
      priority: data.priority,
    };
    user.todolist.push(newItem);
    await user.save();

    return res.sendStatus(201);
  }
);

app.post(
  "/api/delete-todo",
  authenticateToken,
  body("key").notEmpty(),
  async function (req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).send({ errors: result.array() });
    }

    const user = await User.findOne({ email: req.user.email }).exec();
    user.todolist.pull({ key: req.body.key });
    await user.save();

    return res.sendStatus(200);
  }
);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
