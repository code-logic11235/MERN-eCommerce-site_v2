import express from 'express'
const router = express.Router();
import { 
    getProducts, 
    newProduct, 
    getProductDetails,
    updateProduct,
    deleteProduct

 } from '../controllers/productControllers.js';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';

//routes for product resource 

router.route("/products").get( getProducts); 
router.route("/products/:id").get(getProductDetails);

router.route("/admin/products").post(isAuthenticatedUser, authorizeRoles('admin'), newProduct); // auth req
router.route("/admin/products/:id").put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct); //auth req
router.route("/admin/products/:id").delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct); // auth req


export default router;