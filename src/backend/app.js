import express from 'express';
import dotenv from 'dotenv';
const app = express();
import { connectDatabase } from './config/dbConnection.js';

//loads environment variables, path tells location of the .env file. by default it looks in the root directory, but this is a custom path
dotenv.config({path: "src/backend/config/config.env"}); 


//connecting to DB
connectDatabase();
//middle ware parse incoming request wiht JSON. based on body parser
app.use(express.json())
//import all routes
import productRoutes from './routes/products.js';

app.use("/api", productRoutes)

app.listen(process.env.PORT, () =>{
    console.log('Server starting in PORT:', process.env.PORT, `in ${process.env.NODE_ENV} mode.`)
});