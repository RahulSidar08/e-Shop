const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {generateToken} = require("../utils/generateToken")
const userModel = require("../models/user-model");
const flash = require("connect-flash");
app.use(flash())



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

  module.exports.loginUSer = async function(req,res){
    let {email, password} = req.body;

    let user = await userModel.findOne({email: email});
    if(!user) return res.send("Email or Password incorrect");

    bcrypt.compare(password, user.password, function(err,result){
      if(result)
      {
        let token = generateToken(user);
        res.cookie("token",token);
        res.render("shop")
      }else{
        return res.send("Email or Password Incorrect")
      }
    })
  }


  module.exports.lg = function(req,res)
  {
    res.cookie("token","");
    res.redirect("/")
  }