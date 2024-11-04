const express = require("express");
const app = express();
const router = express.Router();
const userModel = require("../models/user-model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generateToken} = require("../utils/generateToken")
const {registerUser} = require("../controllers/authController.js")



router.get("/", function (req, res) {
  res.send("hey it is working");
});

router.post("/register", registerUser)

module.exports = router;
