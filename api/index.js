import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// 
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express();

// middleware for accepting json
app.use(express.json());

mongoose.connect(process.env.MONGODB_CONNECT).then(()=>{
    console.log("mongo db connected");
}).catch((err)=>{
    console.log(err);
});

app.use("/api/user",userRouter);
app.use("/api/auth", authRouter);

app.listen(3001, ()=> {
    console.log("listening on port 3001..");
})