
import Joi from "joi";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    role: {type: String, default: "USER"}
    
})

export const userModel = mongoose.model("user", userSchema);

export const ValidateUser = (_user) => {
    const uSchema = Joi.object({
        userName: Joi.string().min(2).max(15).required(),
        password: Joi.string().required(),
        email: Joi.string().email().required(),
    })
    return uSchema.validate(_user);
}

export const ValidateUserLogin = (_user) => {
    const uSchema = Joi.object({
        userName: Joi.string(),
        password: Joi.string().required(),
        email: Joi.string().email().required(),
    })
    return uSchema.validate(_user);
}