const express = require("express");
const UserModel = require("../models/user.model");
const router = express.Router();
const jwt = require("jsonwebtoken");

// home page
router.get("/", (req, res) => {
  res.send("home");
});

// register route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new UserModel({ name, email, password });
  //   save new user details into db

  await newUser
    .save()
    .then(() => res.status(201).send("user registered successfully"))
    .catch(() => res.send("failed to register"));
});

// login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  const user = await UserModel.findOne({ email, password });
  // const user = {
  //   email: email,
  //   password: password,
  // };
  if (user) {
    // generate the token
    // 3 parts of token - header , payload, signature/secret
    // header generated automatically

    const token = jwt.sign({ id: user._id, email: user.email }, "SECRET1234");

    // to verify the token
    // jwt.verify(token,"SECRET1234")
    res.send({ message: "Login Success", token });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

module.exports = router;
