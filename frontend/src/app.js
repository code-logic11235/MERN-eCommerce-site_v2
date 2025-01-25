import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import './app.css'
import Header from "./components/layout/header.jsx";
import Footer from "./components/layout/footer.jsx";
import UseUserRoutes from "./components/routes/userRoutes.jsx";
import UseAdminRoutes from "./components/routes/adminRoutes.jsx";






function App() {
  const userRoutes = UseUserRoutes();
  const adminRoutes = UseAdminRoutes();
  const location = useLocation();

  const containerClassName = (location?.pathname === '/' && location?.search === '') ? 'home-container' : 'container';

  return (

      <div className="App">
        <Toaster position="top-center" />
        <Header />
        <div className={containerClassName}>
          <Routes>
            {userRoutes}
            {adminRoutes}
          </Routes>
        </div>
        <Footer />
      </div>
  
  );
}

export default App;