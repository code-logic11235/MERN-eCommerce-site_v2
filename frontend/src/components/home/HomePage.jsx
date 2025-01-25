import React from 'react';
import './HomePage.css'
import Search from '../layout/search';

const HomePage = () => {
  return (
    <div className = "homePage" id = "homePage">
      <div className="mastHead-header col-12 col-md-6 mt-2 mt-md-0 mx-auto">
      <h1> Ember & Essence.</h1>
      <h5 className = "homeParagraph"> Transform any room with our exquisite candles, each crafted to bring warmth, serenity, and a touch of luxury to your home</h5>
        <Search isHomePage = {true}/>
        <button className = 'btn fetch-btn ms-4 mt-3 px-5'>Browse Product</button>
      </div>
      
    </div>
  )
}

export default HomePage
