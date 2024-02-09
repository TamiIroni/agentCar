import express from "express";
import carRouter from "./routes/car.js"
import userRouter from "./routes/user.js"
import orderRouter from "./routes/order.js"
import cors from "cors";
import { connectToDb } from "./DB/connectToDb.js";
import {config} from "dotenv";
import {errorHandling} from "./middleWeares/errorHandling.js"
config();
const app = express();

app.use(express.json())
app.use(cors())

connectToDb();

app.use("/api/car", carRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);


app.use(errorHandling)

let port = process.env.port || 3000

app.listen(port, () => {
    console.log("app is listening " + port)
})