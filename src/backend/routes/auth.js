import express from 'express'
import { registerUser,loginUser,logoutUser, forgotPassword, resetPassword, 
    getUserProfile, updateCurrentPassword, updateProfile, getAllUsers, getUserDetail, 
    updateUser,
    deleteUser} from '../controllers/authControllers.js';
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser,getUserProfile);
router.route("/password/update").put(isAuthenticatedUser,updateCurrentPassword);
router.route("/me/updateProfile").put(isAuthenticatedUser,updateProfile);

router.route("/admin/getAllUsers").get(isAuthenticatedUser,authorizeRoles('admin'),getAllUsers);
router.route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetail)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)



export default router;