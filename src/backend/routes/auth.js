import express from 'express'
import { registerUser,loginUser,logoutUser, forgotPassword, resetPassword, getUserProfile, updateCurrentPassword } from '../controllers/authControllers.js';
import { isAuthenticatedUser } from '../middlewares/auth.js';
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser,getUserProfile);
router.route("/password/update").put(isAuthenticatedUser,updateCurrentPassword);


export default router;