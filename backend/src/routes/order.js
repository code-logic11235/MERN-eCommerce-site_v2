import express from 'express'
import { newOrder, getOrderDetails,getCurrentUserOrder, getAllOrders, updateOrder, deleteOrder } from '../controllers/orderControllers.js';
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';
const router = express.Router();

router.route("/orders/new").post(isAuthenticatedUser, newOrder);
router.route("/orders/:id").get(isAuthenticatedUser, getOrderDetails);
router.route("/me/orders/").get(isAuthenticatedUser, getCurrentUserOrder);

router.route("/admin/orders/").get(isAuthenticatedUser, authorizeRoles('admin'), getAllOrders);
router.route("/admin/orders/:id")
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);



export default router;