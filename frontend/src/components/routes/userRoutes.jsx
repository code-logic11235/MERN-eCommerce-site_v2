import React from 'react'
import ForgotPassword from "../auth/forgotPassword.jsx";
import ResetPassword from "../auth/resetPassword.jsx";
import Cart from "../cart/cart.jsx";
import Home from "../layout/home.jsx";
import ProductDetails from "../product/productDetails.jsx";
import Login from "../auth/login.jsx";
import RegisterUser from "../auth/registerUser.jsx";

import PaymentMethod from "../cart/paymentMethod.jsx";
import UpdatePassword from "../user/updatePassword.jsx";
import Profile from "../user/profile.jsx";
import UpdateProfile from "../user/updateProfile.jsx";
import ProtectedRoutes from "../auth/protectedRoutes.js";
import UploadAvatar from "../user/uploadAvatar.jsx";
import Shipping from "../cart/shipping.jsx";
import ConfirmOrder from "../cart/confirmOrder.jsx";
import MyOrders from "../order/myOrders.jsx";
import OrderDetails from "../order/orderDetails.jsx";
import Invoice from "../invoice/invoice.jsx"
import { Route } from 'react-router-dom';


const UserRoutes = () => {
  return (
    <>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<RegisterUser />} />
        <Route path='/password/forgot' element={<ForgotPassword />} />
        <Route path='/password/reset/:token' element={<ResetPassword />} />
        <Route path='/cart' element={<Cart />} />



        {/* <Route path='/payment_method' 
        element= {
            <ProtectedRoutes> 
                <PaymentMethod/> 
            </ProtectedRoutes>
            }
        /> */}
        <Route path="/shipping" element={
            <ProtectedRoutes>
            <Shipping />
            </ProtectedRoutes>
        }
        />
        <Route path="/confirm_order" element={
            <ProtectedRoutes>
            <ConfirmOrder />
            </ProtectedRoutes>
        }
        />
        


        <Route path='/me/orders'
            element={
            <ProtectedRoutes>
                <MyOrders />
            </ProtectedRoutes>
            }
        />
        <Route path="/me/order/:id" element={
            <ProtectedRoutes>
            <OrderDetails />
            </ProtectedRoutes>
        }
        />
        <Route path='/invoice/order/:id'
            element={
            <ProtectedRoutes>
                <Invoice />
            </ProtectedRoutes>
            }
        />

        <Route path='/me/profile'
            element={
            <ProtectedRoutes>
                <Profile />
            </ProtectedRoutes>
            }
        />
        <Route path='/me/update_profile'
            element={
            <ProtectedRoutes>
                <UpdateProfile />
            </ProtectedRoutes>
            }
        />


        <Route path='/me/upload_avatar'
            element={
            <ProtectedRoutes>
                <UploadAvatar />
            </ProtectedRoutes>
            }
        />

        <Route path='/me/update_password'
            element={
            <ProtectedRoutes>
                <UpdatePassword />
            </ProtectedRoutes>
            }
        />


    </>
  )
}

export default UserRoutes
