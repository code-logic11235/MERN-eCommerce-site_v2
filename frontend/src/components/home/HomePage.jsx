import React, { useState, useEffect } from 'react';
import './HomePage.css'
import Search from '../layout/search';

const HomePage = () => {
  const [showBrowseBtn, setShowBrowseButton] = useState(true);
  const [hideClass, setHideClass] = useState(true);
  const handleSearch = ()=>{
    setShowBrowseButton(false)
  }
  const hideButton = (data)=>{
    console.log('yo')
     setTimeout(() => {
      if(data ){
        setHideClass(true)
      }else {
        setHideClass(false)

      }
    }, 300);
  }

  return (
    <div className = "homePage" id = "homePage">
      <div className="mastHead-header col-12 col-md-6 mt-2 mt-md-0 mx-auto">
      <div className='title'>
        <h1 id='title'> La Lûme.</h1>
        <p id= 'est'>Est. 1994</p>

      </div>
      <h5 className = "homeParagraph"> Transform any room with our exquisite candles, each crafted to bring warmth, serenity, and a touch of luxury to your home</h5>
        <div id="search-container">
        {/* <div id="search-container" className = {`search-container${showBrowseBtn?'' :'-focus' }`}> */}

          <Search isHomePage = {true} 
            showBrowseBtn = {showBrowseBtn} 
            setShowBrowseButton = {setShowBrowseButton}
            hideButton = {hideButton}
          />
            { hideClass ? <button id= "homepage-btn" className = {`btn fetch-btn ms-4 mt-3 px-5 ${showBrowseBtn ? '' : 'hide'}`}>Browse Product</button> : ''}
           {/* <button id= "homepage-btn" className = {`btn fetch-btn ms-4 mt-3 px-5 ${showBrowseBtn ? '' : 'hide'}`}>Browse Product</button> */}
        </div>
      </div>
      
    </div>
  )
}

export default HomePage
