//  / -> sigup or login
// /shop - shop
// /users/cart - cart
// /admin - admin panel
// /owner/product - show all products
// /owner/adnmin -  show admin to create products

const express = require("express");
const { route } = require("./ownersRouter");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const isLoggedIn = require("../middlewares/isLoggedIn");
const userModel = require("../models/user-model");

router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("index", { error,loggedin:false });
});

router.get("/shop", isloggedin, async function (req, res) {
  try {
    const products = await productModel.find();
    let success = req.flash("success")
    res.render("shop", { products,success});
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/addtocart/:productid", isloggedin, async function (req, res) {
  try {
    let user = await userModel.findOne({email:req.user.email})
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success","Added to cart");
    res.redirect("/shop")
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/cart", isLoggedIn , async function(req,res)
{
  let user = await userModel.findOne({email : req.user.email}).populate("cart")
  // console.log(user)
  res.render("cart",{user})
})


module.exports = router;
