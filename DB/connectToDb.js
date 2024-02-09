import mongoose from "mongoose";

export const connectToDb = () => {

    let uri = process.env.DB_URI || "mongodb://0.0.0.0:27017/agentCars";
        mongoose.connect(uri)
             .then(suc => {
                   console.log("mongoDB connectrd" + suc.Connection.host);
        })
        .catch(err => {
            console.log("canot connect mongoDB");
            console.log(err)
            process.exit(1);
        })
}