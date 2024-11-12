//routes for product resource 

import express from 'express'
import { getProducts } from '../controllers/productControllers.js';
const router = express.Router();

router.route("/products").get(getProducts); //getProducts is our controller funciton

export default router;