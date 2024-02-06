import { loginUser, getAllUsers, addUser, deletUser} from "../controller/user.js";
import express from "express";
import {auth, authAdmin} from "../middleWeares/auth.js"



const router = express.Router();

router.get("/", auth, getAllUsers)

router.post("/", addUser)

router.delete("/:id", authAdmin, deletUser)

router.post("/login", auth, loginUser)

export default router;
