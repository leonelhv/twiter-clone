import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

//Routes
import authRoutes from "../routes/auth.routes.js"

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json());
dotenv.config()



app.get("/", (_, res) => {
    res.json({ message: "Welcome to backend Twitter Clone." });
});

app.use("/api", authRoutes)


export default app