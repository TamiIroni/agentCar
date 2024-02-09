import { loginUser, getAllUsers, addUser, deletUser} from "../controller/user.js";
import express from "express";
import {auth, authAdmin} from "../middleWeares/auth.js"



const router = express.Router();

router.get("/", authAdmin, getAllUsers)

router.post("/", addUser)

router.delete("/:id", authAdmin, deletUser)

router.post("/login", loginUser)

export default router;
