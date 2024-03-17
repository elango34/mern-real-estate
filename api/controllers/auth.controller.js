import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import Jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";

export const signup = async (req, res, next) => {
  // console.log(req.body);
  const { userName, password, email } = req.body;

  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const user = new User({ userName, password: hashedPassword, email });
    await user.save();
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "successfully saved",
    });
  } catch (error) {
    // https://www.notion.so/Node-js-a74a450ee2864a04b641e826d88e956d?pvs=4#d24f3242fa0a4bc6b162e024581b3146
    // Instead of sending error from each controller, use error middleware from all place
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    // return the next() so that it will terminate and it won't go to the next process
    if (!user) return next(errorHandler(401, "User not found"));
    const validatePassword = bcryptjs.compareSync(password, user.password);
    if (!validatePassword) return next(errorHandler(401, "Wrong credentials"));
    const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // extract password and rename it to pass and expand the remaining things and send it to frontend
    // understand why ._doc is there (https://www.notion.so/Node-js-a74a450ee2864a04b641e826d88e956d?pvs=4#d99d922b1e5549519a1800c74695684b)
    const { password: pass, ...remainingUserDetails } = user._doc;
    setTimeout(function () {
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({
          ...remainingUserDetails,
          success: true,
          message: "successfully loggged in",
        });
    }, 5000);
  } catch (error) {
    next(error);
  }
};
