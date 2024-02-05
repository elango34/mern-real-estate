import bcryptjs from "bcryptjs"
import User from "../models/user.model.js";

export const signup = async(req, res, next) => {
    console.log(req.body);
    const {userName, password, email} = req.body;

    try {
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const user = new User({userName, password: hashedPassword, email});
        await user.save();
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "successfully saved"
        })
    } catch(error) {
        // https://www.notion.so/Node-js-a74a450ee2864a04b641e826d88e956d?pvs=4#d24f3242fa0a4bc6b162e024581b3146
        // Instead of sending error from each controller, use error middleware from all place
        next(error);
    }
}