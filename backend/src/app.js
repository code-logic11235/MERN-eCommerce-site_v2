import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './config/dbConnection.js';
import errorsMiddleware from './middlewares/errorHandlerMiddleware.js';
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/order.js'
import cookieParser from 'cookie-parser';
import paymentRoute from "./routes/payment.js"

const app = express();

process.on('uncaughtException', (err) => {
    console.log('Uncaught Exception:', err);
    console.log("Shutting down server due to uncaught exception");

    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        console.log('Server not initialized. Exiting process.');
        process.exit(1);
    }
});
//loads environment variables, path tells location of the .env file. by default it looks in the root directory, but this is a custom path
dotenv.config({ path: 'src/config/config.env' });


//connecting to DB
connectDatabase();
//middle ware parse incoming request wiht JSON. based on body parser
app.use(express.json({limit: "3mb"})); // limit a 3mb upload size 
app.use(cookieParser());

//import all routes
app.use("/api", productRoutes);
app.use("/api", authRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentRoute);


// when you use "next()" in our controller it will send a error object to our errorsMiddleware
app.use(errorsMiddleware);

const server = app.listen(process.env.PORT, () =>{
    console.log('Server starting in PORT:', process.env.PORT, `in ${process.env.NODE_ENV} mode.`)
});

//handle unhandled promise rejections
// close down server and wait till error is fixed
//  Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log('ERROR:', err);
    console.log("Shutting down server due to unhandled promise rejection");

    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        console.log('Server not initialized. Exiting process.');
        process.exit(1);
    }
});
