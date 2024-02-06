import express from "express";
import { deletCar, getAllCars,  getCarById, addCar, updateCar} from "../controller/car.js";
import {auth, authAdmin} from "../middleWeares/auth.js"


const router = express.Router();

router.get("/",  getAllCars)

router.get("/:id", getCarById)

router.post("/", authAdmin, addCar)

router.delete("/:id", authAdmin, deletCar)

router.put("/:id", authAdmin, updateCar)

export default router;
