const express = require("express")
const app = express();
const cookieParser = require("cookie-parser")
const path = require("path")
const db = require("./config/mongoose-connection")
const ownersRouter = require("./routes/ownersRouter")
const usersRouter = require("./routes/usersRouter")
const productsRouter = require("./routes/productsRouter")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")));


app.use("/owners",ownersRouter)
app.use("/users", usersRouter)
app.use("/products", productsRouter)

app.get("/", (req,res) =>{
    res.send("hey");
})

app.listen(3000)