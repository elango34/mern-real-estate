// Read about mongo and mongoose
// https://www.notion.so/Node-js-a74a450ee2864a04b641e826d88e956d?pvs=4

import mongoose, { model } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const userSchema = mongoose.Schema({
  userName: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  avatar: {
    type: String,
    default: `${process.env.BASE_URL}/images/default_avatar.png`,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
