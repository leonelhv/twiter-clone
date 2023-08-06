const dotenv = require("dotenv")
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

//Midlewares
const ErrorHandler = require("./middlewares/ErrorHandler.js")


//Routes
const authRoutes = require("./routes/auth.routes.js")
const tweethRoutes = require("./routes/tweet.routes.js");
const userRoutes = require("./routes/user.routes.js");
const seedRoutes = require("./routes/seeder.routes.js");

const corsOptions = {
  origin: process.env.FRONTEND_URL || true,
  credentials: true,
};


const app = express()
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json());

dotenv.config()


app.use("/assets", express.static(__dirname + '/assets'))

app.get("/", (_, res) => {
  res.json({ message: "Welcome to backend Twitter Clone." });
});


app.use("/api", authRoutes)
app.use("/api", tweethRoutes)
app.use("/api", userRoutes)
if (process.env.NODE_ENV === 'development') {
  app.use("/api/seeder", seedRoutes)
}
app.use(ErrorHandler)



module.exports = app;
