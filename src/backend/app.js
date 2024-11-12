import express from 'express';
const app = express();
import dotenv from 'dotenv';

dotenv.config({path: "src/backend/config/config.env"});

app.listen(process.env.PORT, () =>{
    console.log('Server starting in PORT:', process.env.PORT, `in ${process.env.NODE_ENV} mode.`)
});