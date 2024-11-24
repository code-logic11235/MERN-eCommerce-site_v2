import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import './app.css'

// import NavBar from "./components/navbar.jsx";
import Header from "./components/layout/header.jsx";
import Footer from "./components/layout/footer.jsx";
import Home from "./components/layout/home.jsx";

function App() {
  {console.log("hello worllldd")}
    return (
      <Router>
        <div className="App">
          <Header/>

          <div className="container">
            <Routes>
              <Route path='/' element={<Home/>} />
            </Routes>

          </div>
          <Footer/>
        </div>

      </Router>
    );
  }
  
  export default App;