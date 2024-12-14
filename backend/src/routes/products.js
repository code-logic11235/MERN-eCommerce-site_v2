import express from 'express'
const router = express.Router();
import { 
    getProducts, 
    newProduct, 
    getProductDetails,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReview,
    deleteReview,
    canUserReview

 } from '../controllers/productControllers.js';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';

//routes for product resource 

router.route("/products").get( getProducts); 
router.route("/products/:id").get(getProductDetails);

router.route("/admin/products").post(isAuthenticatedUser, authorizeRoles('admin'), newProduct); // auth req
router.route("/admin/products/:id").put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct); //auth req
router.route("/admin/products/:id").delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct); // auth req

router.route("/reviews")
    .put(isAuthenticatedUser, createProductReview)
    .get(isAuthenticatedUser, getProductReview);

router.route("/admin/reviews")
    .delete(isAuthenticatedUser,authorizeRoles('admin'), deleteReview);

router.route("/can_review").get(isAuthenticatedUser, canUserReview);
export default router;