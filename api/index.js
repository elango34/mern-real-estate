import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

//
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express();

// middleware for accepting json
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_CONNECT)
  .then(() => {
    console.log("mongo db connected");
  })
  .catch((err) => {
    console.log(err);
  });

// serving static assests

// ***** Use this, If you are running index.js not from the root dir ******
// const __dirname = path.dirname(new URL(import.meta.url).pathname);
// app.use(express.static(path.join(__dirname, 'public')));

// ********** or, just use this ***********
app.use(express.static("public"));

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// https://www.notion.so/Node-js-a74a450ee2864a04b641e826d88e956d?pvs=4#d24f3242fa0a4bc6b162e024581b3146
app.use((err, req, res, next) => {
  const errorStatusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal server error";

  res.status(errorStatusCode).json({
    success: false,
    statusCode: errorStatusCode,
    message: errorMessage,
  });
});

app.listen(3001, () => {
  console.log("listening on port 3001..");
});
