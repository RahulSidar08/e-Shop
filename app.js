const express = require("express")
const app = express();
const cookieParser = require("cookie-parser")
const path = require("path")
const db = require("./config/mongoose-connection")
const indexRouter = require("./routes/index")
const ownersRouter = require("./routes/ownersRouter")
const usersRouter = require("./routes/usersRouter")
const productsRouter = require("./routes/productsRouter");
const router = require("./routes");
const flash = require("connect-flash");
const expressSession = require("express-session");
const { lg } = require("./controllers/authController");

require("dotenv").config();

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")));

app.use(cookieParser())
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.JWT_KEY,
}))
app.use(flash())


app.use("/",indexRouter)
app.use("/owners",ownersRouter)
app.use("/users", usersRouter)
app.use("/products", productsRouter)

app.listen(3000)