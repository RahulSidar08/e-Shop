const { Store } = require("express-session");
const multer = require("multer")
const storage = multer.memoryStorage();
const upload  = multer({Storage:storage})

module.exports = upload;