// Read about mongo and mongoose
// https://www.notion.so/Node-js-a74a450ee2864a04b641e826d88e956d?pvs=4

import mongoose, { model } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// const opts = { toJSON: { virtuals: true } };

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

// Define a virtual property for the full avatar URL
if (process.env.IMAGE_UPLOAD == "local") {
  userSchema.virtual("avatarUrl").get(function () {
    if (this.avatar && !this.avatar.includes("default_avatar.png")) {
      return `${process.env.BASE_URL}images/profile/${this.avatar}`;
    }
    return this.avatar;
  });
}

// Set any options if needed
// userSchema.set("toJSON", { virtuals: true }); // Example: This sets options for JSON serialization

const User = mongoose.model("User", userSchema);

export default User;
