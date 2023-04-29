const express = require("express");

const { UserModel } = require("../model/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { pass, name, age, email } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      const user = new UserModel({ email, name, age, pass: hash });
      await user.save();
      res.status(200).send({ msg: "New user has been registered" });
    });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(pass, user.pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ authorID:user._id,author:user.name}, "masai", {
            expiresIn: "1h",
          });

          res
            .status(200)
            .send({ msg: "New user has been logged in", token: token });
        } else {
          res.status(200).send({ msg: "Wrong username or password" });
        }
      });
    } else {
      res.status(200).send({ msg: "Wrong username or password" });
    }
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

module.exports = { userRouter };
