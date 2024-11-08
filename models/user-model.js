const mongoose = require("mongoose");
const { type } = require("os");
const { stringify } = require("querystring");
// mongoose.connect("monogdb://127.0.0.1:27017/scatch")

const userSchema = mongoose.Schema({
    fullname : {
        type:String,
        minlength:3,
        trim:true,
    },
    email : String,
    password: String,
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref : "product"
    }],
    orders:{
        type:Array,
        default:[]
    },
    contact: Number,
    picture: String,
});

module.exports = mongoose.model("user",userSchema);
