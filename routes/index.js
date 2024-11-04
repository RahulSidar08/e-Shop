//  / -> sigup or login 
// /shop - shop
// /users/cart - cart
// /admin - admin panel
// /owner/product - show all products
// /owner/adnmin -  show admin to create products 

const express = require("express");
const { route } = require("./ownersRouter");
const router = express.Router();

router.get("/", function(req,res)
{
    res.render("index");
})

module.exports = router;