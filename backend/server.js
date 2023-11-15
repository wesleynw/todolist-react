const express = require("express");
const app = express();
const port = 3000;

// middleware to parse request bodies as JSON
app.use(express.json());

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const bcrypt = require("bcrypt");

// main().catch((err) => console.log(err));
// async function main() {
//   await mongoose.connect(mongoDB);
// }

// Wait for database to connect, logging an error if there is a problem
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

app.post("/signup", async function (req, res) {
  // ensure databse is connected
  if (mongoose.connection.readyState != 1) {
    return res.sendStatus(500);
  }

  body = req.body;
  // need to implement error checking for badly formatted requests
  // console.log(User.exists({username: body.username}));

  bcrypt.genSalt(10, (err, salt) => {
    if (err != null) {
      return res.sendStatus(500);
    }
    // use salt to hash password
    bcrypt.hash(body.password, salt, async function (err, hash) {
      if (err != null) {
        return res.sendStatus(500);
      }
      // Store hash in the database
      let newUser = new User({
        username: body.username,
        password: hash,
        salt: salt,
      });

      await newUser.validate();

      let result = await newUser.save();

      if (result != newUser) {
        console.log("db error");
        // next(result);
        return res.sendStatus(500);
      }

      console.log(`created user ${body.username}`);
      return res.sendStatus(201);
    });
  });
  // return res.sendStatus(500);
});

app.get("/test-get", async function (req, res) {
  res.send("it is working lol");
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
