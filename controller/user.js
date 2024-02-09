import { userModel, ValidateUser, ValidateUserLogin } from "../models/user.js";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import { generateToken } from "../DB/generateToken.js"


export const getAllUsers = async (req, res) => {
    try {
        let allUsers = await userModel.find({});
            return res.json(allUsers)
    }
    catch (err) {
        res.status(400).json(err)
    }
}

export const deletUser = async (req, res) => {
    let id = req.params.id;
    if (!mongoose.isValidObjectId(id))
        return res.status(404).send("the id is not a valid format")
    try {
        let deletUser = await userModel.findByIdAndDelet(id);
        if (!deletUser)
            return res.status(404).send("we didn't find a user with such id to delet")
        if (req.myUser.role != "ADMIN")
            return res.status(403).send("only administrator alwos to delet user")
        deletUser = await userModel.findByIdAndDelet(id)
        return res.status(200).json(deletUser)
    }
    catch (err) {
        res.status(404).json(err)
    }
}

export const addUser = async (req, res) => {

    let result = ValidateUser(req.body);
    console.log(result);
    if (result.error)
        return res.status(400).send(result.error.details[0].message);
    let { userName, password, email } = req.body;
    try {
        let sameUser = await userModel.findOne({ $or: [{ email: email }, { userName: userName }] });
        if (sameUser)
            return res.status(409).send("there is alredy same user");
        let hashedPassword = await bcryptjs.hash(password, 15);
        let newUser = new userModel({ userName, password: hashedPassword, email });
        await newUser.save();
        // let token = generateToken(newUser.userName, newUser._id, newUser.role);
        let token=generateToken(newUser)
        
        return res.status(201).json({ userName: newUser.userName, role: newUser.role, _id: newUser._id, token })
    }
    catch (err) {
        res.status(500).json(err)
    }
}

export const loginUser = async (req, res) => {
    let result = ValidateUserLogin(req.body);
    if (result.error)
        return res.status(400).send(result.error.details[0].message)
    let { password, email } = req.body;
    try {
        let isUser = await userModel.findOne({ email: email })
        console.log("isUser:", isUser);
        if (!isUser || !await bcryptjs.compare(password, isUser.password))
            return res.status(400).send("email not exist, no such user, please sign up");
        let token = generateToken(isUser.userName, isUser._id, isUser.role);
            return res.status(200).json({ userName: isUser.userName, role: isUser.role, _id: isUser._id, token })
    }
    catch (err) {
        res.status(400).json(err)
    }
}



