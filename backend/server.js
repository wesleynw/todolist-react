const express = require("express");
const app = express();
const port = 3000;

const { body, query, validationResult } = require("express-validator");

app.use(express.json());

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const bcrypt = require("bcrypt");

const mongoDB = "mongodb://127.0.0.1:8081/todo-backend";
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

// Define a schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: Buffer,
  salt: Buffer,
  // todolist: mongoose.Schema.Types.ObjectId,
});

// Compile model from schema
const User = mongoose.model("Users", UserSchema);

app.post(
  "/signup",
  body("username")
    .notEmpty()
    .trim()
    .custom(async (username) => {
      const count = await User.find({ username: username }).countDocuments();
      return count == 0;
    })
    .withMessage("username already in use"),
  body("password").notEmpty(),
  body("password_confirmation")
    .notEmpty()
    .custom((value, { req }) => {
      return value == req.body.password;
    })
    .withMessage("passwords do not match"),
  async function (req, res) {
    if (mongoose.connection.readyState != 1) {
      return res.status(500).send({
        errors: {
          msg: "database error",
        },
      });
    }

    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(422).send({ errors: result.array() });
      }

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, async function (err, hash) {
          // Store hash in the database
          let newUser = new User({
            username: req.body.username,
            password: hash,
            salt: salt,
          });

          // await newUser.validate();
          let result = await newUser.save();

          if (result != newUser) {
            throw new Error("db error");
          }

          console.log(`created user ${req.body.username}`);
          return res.sendStatus(201);
        });
      });
    } catch (err) {
      res.sendStatus(500);
    }
  }
);

app.get("/test-get", async function (req, res) {
  res.send("it is working lol");
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
