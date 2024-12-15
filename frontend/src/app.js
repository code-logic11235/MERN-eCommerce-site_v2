import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import './app.css'
import Header from "./components/layout/header.jsx";
import Footer from "./components/layout/footer.jsx";
import UseUserRoutes from "./components/routes/userRoutes.jsx";
import UseAdminRoutes from "./components/routes/adminRoutes.jsx";


// import AdminRoutes from "./components/routes/adminRoutes.jsx";


function App() {
  const userRoutes = UseUserRoutes();
  const adminRoutes = UseAdminRoutes();
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center" />
        <Header />

        <div className="container">
          <Routes>
            {userRoutes}
            {adminRoutes}
          </Routes>


        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;