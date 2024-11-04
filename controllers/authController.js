const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {generateToken} = require("../utils/generateToken")
const userModel = require("../models/user-model");

module.exports.registerUser = async function(req, res) {
    try {
      let { email, password, fullname } = req.body;


      let user = await userModel.findOne({email:email})
      if(user) return res.status(401).send("You already have an account , please login")

      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          if (err) return res.send(err.message);
          else {
            let user = await userModel.create({
              email,
              password:hash,
              fullname,
            });
            
            let token = generateToken(user);
            res.cookie("token",token)
            res.send("user created Successfully");
          }
        });
      });
    } catch (err) {
      res.send(err.message);
    }
  }