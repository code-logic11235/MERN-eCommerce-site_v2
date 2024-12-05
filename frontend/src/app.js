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
            <Route path='/me/profile' element= {<Profile/>}/>
            <Route path='/me/update_profile' element= {<UpdateProfile/>}/>
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;