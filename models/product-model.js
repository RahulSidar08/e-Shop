const mongoose = require("mongoose");
const { type } = require("os");

const productSchema = mongoose.Schema({
  image: String,
  name: String,
  price: Number,
  discount: {
    type: Number,
    default: 0
  },
  bgcolor: String,
  panelcolor: String,
  tectcolor: String,
});

module.exports = mongoose.model("product", productSchema);
