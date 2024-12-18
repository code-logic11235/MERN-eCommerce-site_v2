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

app.use(
    express.json({
      limit: "10mb",
      verify: (req, res, buf) => {
        req.rawBody = buf.toString();
      },
    })
  );

//     Stripe requires the raw, unmodified body of the webhook request for signature verification. Stripe signs each webhook event, and to validate the authenticity of the event, you need to compare the signature sent in the headers (Stripe-Signature) with one generated using the raw body of the request.
// req.rawBody stores this raw body as a string (using buf.toString()), so that you can use it for signature verification when calling stripe.webhooks.constructEvent() in paymentController.js backend.



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
