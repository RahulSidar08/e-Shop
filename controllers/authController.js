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
      if(user)
        {
          // res.send("You already have an account , please login")
          req.flash("error","You already have an account , please login");
          res.redirect("/")
          return;
        }


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
            req.flash("error", "user created Successfuly");
            res.redirect("/")
            // res.send("user created successfully")
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
    if(!user)
    {
      req.flash("error","email or password incorrect");
      res.redirect("/")
      return;
    }

    bcrypt.compare(password, user.password, function(err,result){
      if(result)
      {
        let token = generateToken(user);
        res.cookie("token",token);
        res.render("shop")
      }else{
        // return res.send("somthing went wrong")
        req.flash("error","something went wrong")
        res.redirect("/")
      }
    })
  }


  module.exports.lg = function(req,res)
  {
    res.cookie("token","");
    res.redirect("/")
  }