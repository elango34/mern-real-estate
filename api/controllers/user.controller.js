import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

export const test = (req, res) => {
  res.json({
    message: "Api route is working!",
  });
};

export const avatarUpload = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      avatar: req.file.filename,
    });

    await updateUser.save();

    let avatarUrl = req.file.filename;
    if (process.env.IMAGE_UPLOAD === "local") {
      avatarUrl = `${process.env.BASE_URL}images/profile/${req.file.filename}`;
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "successfully saved",
      avatarUrl,
    });
  } catch (error) {
    next(error);
  }
};
