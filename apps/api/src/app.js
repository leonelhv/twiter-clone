const dotenv = require("dotenv")
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

//Midlewares
const ErrorHandler = require("./middlewares/ErrorHandler.js")


//Routes
const authRoutes = require("./routes/auth.routes.js")


const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json());
dotenv.config()


app.use("/assets", express.static(__dirname + '/assets'))

app.get("/", (_, res) => {
    res.json({ message: "Welcome to backend Twitter Clone." });
});


app.use("/api", authRoutes)
app.use(ErrorHandler)



module.exports = app;
