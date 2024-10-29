const mongoose = require("mongoose");
const { type } = require("os");
const { stringify } = require("querystring");

const ownerSchema = mongoose.Schema({
    fullname : {
        type:String,
        minlength:3,
        trim:true,
    },
    email : String,
    password: String,
    products:{
        type:Array,
        default:[]
    },
    picture: String,
    gstin:String
});

module.exports = mongoose.model("owner",ownerSchema);
