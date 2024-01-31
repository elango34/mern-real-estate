import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// 
import userRouter from "./routes/user.route.js";

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_CONNECT).then(()=>{
    console.log("mongo db connected");
}).catch((err)=>{
    console.log(err);
});

app.use("/api/user",userRouter);

app.listen(3001, ()=> {
    console.log("listening on port 3001..");
})