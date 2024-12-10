import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import './app.css'

// import NavBar from "./components/navbar.jsx";
import Header from "./components/layout/header.jsx";
import Footer from "./components/layout/footer.jsx";
import Home from "./components/layout/home.jsx";
import ProductDetails from "./components/product/productDetails.jsx";
import Login from "./components/auth/login.jsx";
import RegisterUser from "./components/auth/registerUser.jsx";
import Profile from "./components/user/profile.jsx";
import UpdateProfile from "./components/user/updateProfile.jsx";
import ProtectedRoutes from "./components/auth/protectedRoutes.js";
import UploadAvatar from "./components/user/uploadAvatar.jsx";
import UpdatePassword from "./components/user/updatePassword.jsx";
import ForgotPassword from "./components/auth/forgotPassword.jsx";
import ResetPassword from "./components/auth/resetPassword.jsx";
import Cart from "./components/cart/cart.jsx";
import Shipping from "./components/cart/shipping.jsx";
import ConfirmOrder from "./components/cart/confirmOrder.jsx";
import PaymentMethod from "./components/cart/paymentMethod.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-right"/>
        <Header/>

        <div className="container">
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/product/:id' element={<ProductDetails/>} />
            <Route path='/login' element= {<Login/>}/>
            <Route path='/register' element= {<RegisterUser/>}/>
            <Route path='/password/forgot' element= {<ForgotPassword/>}/>
            <Route path='/password/reset/:token' element= {<ResetPassword/>}/>
            <Route path='/cart' element= {<Cart/>}/>

            <Route path="/shipping" element={
              <ProtectedRoutes> 
                <Shipping/>
              </ProtectedRoutes> 
            }
            />
            <Route path="/confirm_order" element={
              <ProtectedRoutes> 
                <ConfirmOrder/>
              </ProtectedRoutes> 
              }
              />

            <Route path='/payment_method' 
              element= {
                  <ProtectedRoutes> 
                    <PaymentMethod/> 
                  </ProtectedRoutes>
                }
              />

          

            <Route path='/me/profile' 
            element= {
                <ProtectedRoutes> 
                  <Profile/> 
                </ProtectedRoutes>
              }
            />
            <Route path='/me/update_profile' 
            element= {
                <ProtectedRoutes> 
                  <UpdateProfile/> 
                </ProtectedRoutes>
              }
            />


            <Route path='/me/upload_avatar' 
              element= {
                  <ProtectedRoutes> 
                    <UploadAvatar/> 
                  </ProtectedRoutes>
                }
              />

            <Route path='/me/update_password' 
              element= {
                  <ProtectedRoutes> 
                    <UpdatePassword/> 
                  </ProtectedRoutes>
                }
              />

            
          </Routes>


        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;