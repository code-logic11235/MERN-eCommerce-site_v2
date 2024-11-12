import express from 'express';
const app = express();
import dotenv from 'dotenv';

//loads environment variables, path tells location of the .env file. by default it looks in the root directory, but this is a custom path
dotenv.config({path: "src/backend/config/config.env"}); 

import { connectDatabase } from './config/dbConnection.js';
connectDatabase();
//connecting to DB


//import all routes
import productRoutes from './routes/products.js';

app.use("/api/v1", productRoutes)

app.listen(process.env.PORT, () =>{
    console.log('Server starting in PORT:', process.env.PORT, `in ${process.env.NODE_ENV} mode.`)
});