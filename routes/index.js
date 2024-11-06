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

router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isloggedin, async function (req, res) {
  try {
    const products = await productModel.find();
    res.render("shop", { products});
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
