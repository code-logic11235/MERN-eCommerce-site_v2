import express from 'express'
const router = express.Router();
import { 
    getProducts, 
    newProduct, 
    getProduct,
    updateProduct,
    deleteProduct

 } from '../controllers/productControllers.js';


//routes for product resource 

router.route("/products").get(getProducts); //getProducts is our controller function

router.route("/admin/products").post(newProduct);

router.route("/products/:id").get(getProduct);

router.route("/products/:id").put(updateProduct);

router.route("/products/:id").delete(deleteProduct);


export default router;