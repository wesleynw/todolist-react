const express = require("express");
const app = express();
const port = 3000;

// middleware to parse request bodies as JSON
app.use(express.json());

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = "mongodb://127.0.0.1:8081/todo-backend";

const bcrypt = require("bcrypt")

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

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
  body = req.body;
  // need to implement error checking for badly formatted requests
  // console.log(User.exists({username: body.username}));
  let newUser;

  bcrypt.genSalt(10, (err, salt) => {
    // use salt to hash password
    bcrypt.hash(body.password, salt, async function(err, hash) {
      // Store hash in the database
      newUser = new User({
        username: body.username,
        password: hash,
        salt: salt
      })

      await newUser.validate();
      let result = await newUser.save();
  });
  })

  console.log(`created user ${body.username}`)
  res.sendStatus(201);
});

app.get("/test-get", async function (req, res) {
  res.send("it is working lol");
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
