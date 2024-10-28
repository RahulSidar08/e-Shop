const mongoose = require("mongoose");
const { type } = require("os");
const { stringify } = require("querystring");
mongoose.connect("monogdb://127.0.0.1:27017/scatch"):

const userSchema = mongoose.Schema({
    fullname : String,
    email : String,
    password: String,
    cart:{
        type:Array,
        default:[]
    },
    isadmin:Boolean,
    orders:{
        type:Array,
        default:[]
    },
    contact: Number,
    picture: String,
});

module.exports = mongoose.model("user",userSchema);
