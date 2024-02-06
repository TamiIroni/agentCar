import exp from "constants";
import { orderModel, validatorOrder } from "../models/order.js"



export const getAllOrders = async (req, res) => {
    try {
        let allOrders = await orderModel.find({});
            return res.json(allOrders)
    }
    catch (err) {
        res.status(400).json(err)
    }
}

export const addOrder = async (req, res) => {
    let{_id} = req.user;
    let validate = validatorOrder(req.body);
    if (validate.error)
        return res.status(400).json({ type: 'not valid body', message: validate.error.details[0].message });
    for (const item of req.body.orderedProducts) {
        let validateProducts = await validatorMinimalProduct(item);
        if (validateProducts.error)
            return res.status(400).json({ type: 'not valid body', message: validateProducts.error.details[0].message });
        let productName = item.prodName;
        let productToAdd = await carModel.findOne({ productName });
        if (!productToAdd)
            return res.status(404).json({ type: 'not found', message: 'there is no product with such name' });
    }
    let { dueDate, orderAddress, orderOnTheWay, orderedProducts } = req.body;
    try {
        let clientOrderCode = req.user._id;
        let newOrder =  await orderModel.create({ dueDate, orderAddress, orderOnTheWay, orderedProducts, clientOrderCode })
        res.json(newOrder);
    } 
    catch (err) {
        res.status(400).json({ type: "error", message: err.message });
        }
}

export const deletOrder = async (req, res) => {
    let id = req.params.id;
    if (!mongoose.isValidObjectId(id))
    return res.status(404).send("the id is not a valid format")
    try {
        let deletorder = await orderModel.findByIdAndDelet({_id:id})
        if (!deletOrder)
            return res.status(400).send("we dont have such a car with this id to delet")
        return res.status(200).json(deletOrder)
    }
    catch (err) {
        res.status(404).json(err)
    }
}

export const getAllOrderByClientCode = async (req,res) => {
    let {_id, role} = req.user;
    if (role == "ADMIN" && req.body.clientOrderCode)
       _id = req.body.clientOrderCode;
    try {
        let allOrderByClientCode = await orderModel.findOne({clientOrderCode: _id})
        res.json (allOrderByClientCode);
    }   
    catch (err){
            res.status(404).json(err)
        } 
}

export const updateOrder = async (req, res) => {
    let {_id} = req.body;
    if (!mongoose.isValidObjectId(id))
    return res.status(404).send("the id is not a valid format");
    try {
        let order = await orderModel.findByIdAndDelet({_id:id})
        if (!order)
            return res.status(400).send("we dont have such a car with this id to update")
        await orderModel.findByIdAndUpdate(id, {orderOnTheWay: true})
        let orderToUpdate = await orderModel.findByid(id);
        res.json("order in on the way:=> "+orderToUpdate.orderOnTheWay);
    }
    catch (err) {
        res.status(404).json(err)
        }
}
