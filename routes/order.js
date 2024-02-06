import express from "express";
import { getAllOrders, getAllOrderByClientCode,  addOrder, deletOrder, updateOrder} from "../controller/order.js";
import {auth, authAdmin} from "../middleWeares/auth.js"


const router = express.Router();

router.get("/",authAdmin,  getAllOrders)

router.get("/:id",authAdmin, getAllOrderByClientCode)

router.post("/", auth, addOrder)

router.delete("/:id", auth, deletOrder)

router.put("/:id", authAdmin, updateOrder)

export default router;
