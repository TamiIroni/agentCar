

import mongoose from "mongoose";

const carSchema = mongoose.Schema({
    prodName: String,
    price: Number,
    isElectronic: Boolean,
    prodYear:Number,
    Picture: String
})

export const carModel = mongoose.model("cars", carSchema);

export const validateCar = (_car) => {
    let carJoi = Joi.object({
        prodName: Joi().String().min(3).max(7).required(),
        price: Joi.number().nim(50000).required(),
        isElectrinic: Joi().Boolean(),
        prodYear: Joi(). Number().required(),
        Picture: Joi().string()
    })
return carJoi.validate(_car);
}

