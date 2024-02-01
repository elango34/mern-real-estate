import bcryptjs from "bcryptjs"
import User from "../models/user.model.js";

export const signup = async(req, res, next) => {
    console.log(req.body);
    const {userName, password, email} = req.body;

    try {
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const user = new User({userName, password: hashedPassword, email});
        await user.save();
        res.status(201).json("successfully saved");
    } catch(error) {
        res.status(500).json(error.message);

    }
}