import { carModel } from "../models/car.js";


export const getAllCars = async (req, res) => {

        let txt = req.query.txt || "";
         let page = req.query.page || 1;
         let perPage = req.query.perPage || 6;
         try {
            let result = await carModel.find({prodName: new RegExp(txt)}).skip(perPage * (page - 1)).limit(perPage);
            res.json(result)
         }
         catch (err){
            res.status(400).json(err)
         }
}

export const getCarById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(404).send("the id is not a valid format")
    try {
        let data = await carModel.findOne({ _id: id });
        if (!data)
            return res.status(404).send("we didn't find a car with such id")
        res.json(data)
    }
    catch (err) {
        res.status(400).json(err)
    }
}

export const deletCar = async (req, res) => {
    let id = req.params.id;
    if (!mongoose.isValidObjectId(id))
        return res.status(404).send("the id is not a valid format")
    try {
        let deletCar = await carModel.findByIdAndDelet({ _id: id });
        if (!deletCar)
            return res.status(404).send("we didn't find a car with such id to delet")
        return res.status(200).json(deletCar)
    }
    catch (err) {
        res.status(404).json(err)
    }
}

export const updateCar = async (req, res) => {
    let id = req.params.id;
    if (!mongoose.isValidObjectId(id))
        return res.status(404).send("the id is not a valid format")
    let { prodName, price, isElectronic, prodYear } = req.body;
    try {
        let carToUpdate = await carModel.findByIdAndUpdate(id, req.body, { new: true })
        if (!carToUpdate)
            return res.status(404).send("we didn't find a car with such id to update")
        return res.status(200).json(carToUpdate)
    }
    catch (err) {
        res.status(400).json(err)
    }
}

export const addCar = async (req, res) => {
    let { prodName, prodYear } = req.body;
    if (!prodName || !prodYear)
        return res.status(404).send("missing parameters in body: prodName or prodYear")
    try {
        let sameCar = await carModel.findOne({ prodName: prodName, prodYear: prodYear })
        if (sameCar)
            return res.status(409).send("we exist a car with same details")
        let newCar = new carModel(req.body);
        await newCar.save()
        return res.status(201).json(newCar)
    }
    catch (err) {
        res.status(400).json(err)
    }
}


