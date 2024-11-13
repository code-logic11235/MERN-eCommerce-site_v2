import { connectDatabase } from "../config/dbConnection.js";
import mongoose from "mongoose";
import products from "./data.js"
import product from "../models/products.js";

const seedProduct = async ()=>{
    try {
        await connectDatabase();
        await product.deleteMany();
        console.log("Products deleted!")

        await product.insertMany(products)
        console.log("Products Added!")

        process.exit();

    }catch (e){
        console.log(e.message)
        process.exit()
    }
}

seedProduct();