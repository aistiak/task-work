const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateJWT = require("../utils/auth");
const { accessTokenSecret } = require("../utils/config");
router.post("/signup", async (req, res) => {
  try {
    // if user already exists 
    const prevUser = await User.find({email : req.body.email})
    console.log(prevUser?.length)
    if(prevUser.length) res.send(`user exists`)
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });
    // if email taken
    const data = await user.save();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.send("Error" + err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email,
    });
    console.log(user.name)
    if (!user) res.send(`user not found`);
    const accessToken = jwt.sign(
      { email: user.email , userId: user._id , name : user.name },
      accessTokenSecret,
      { expiresIn: "200m" }
    );
    res.json({ accessToken ,userId : user.id , name : user.name});
  } catch (err) {
    console.log(err);
    res.send("Error" + err);
  }
});

router.post("/test", authenticateJWT, async (req, res) => {
  res.send("welcome");
});

module.exports = router;
