
import React, { useState } from 'react'
import "./BackgroundSlider.css"
import video1 from '../../../public/images/video1.mp4'
import img1 from '../../../public/images/img2.jpg'
import img2 from '../../../public/images/img3.jpg'


const BackgroundSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides =  [
        {
            type: "video",
            url: video1,
            title: 'Slide 1',
            description: 'special edition fragrances...'
        },
        {
            type: 'img',
            url: img1,
            title: 'Slide 1',
            description: 'special edition CANDLES...'
        },
        {
            type: 'img',
            url: img2,
            title: 'Slide 3',
            description: 'CANDLES...'
        },
    ]

    const bgImageStyle ={
        backgroundImage: `url(${slides[currentSlide].url})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100%',
        width: '100%'
        }

    const handleMouseOver= ()=>{
        console.log('hit')
    }
  return (
    <div className='container-style'>
        <div id = 'bgContent'>
        {slides[currentSlide].type === 'video' ? 
         <video src={slides[currentSlide].url} autoPlay loop muted/>
         :
         <div style = {bgImageStyle}></div>
          }
        </div>

          <div id='content'>
            <div 
                className={`slider fragrances ${currentSlide === 0 ? 'active' : ''}`} 
                onMouseOver={()=>{
                    handleMouseOver()
                    setCurrentSlide(0)}
                } >
                <h3>FINE FRAGRANCES</h3>
                <h6>Hand Crafted to each order.</h6>
                <div className={`slider-learn learn-fragrances ${currentSlide === 0 ? 'active' : 'deactive'}`}>
                    <a href="">view more</a>
                </div>
            </div>
            <div 
              className={`slider candles ${currentSlide === 1 ? 'active' : ''}`} 
                onMouseOver={()=>{
                    handleMouseOver()
                    setCurrentSlide(1)}
                }>
                <h3>BOTIQUE CANDLES</h3>
                <h6>Expertly crafted and cured boutique candles.</h6>
                <div className={`slider-learn learn-candles ${currentSlide === 1 ? 'active' : 'deactive'}`}>
                    <a href="">view more</a>
                </div>
            </div>
            <div 
                  className={`slider about ${currentSlide === 2 ? 'active' : ''}`} 
                onMouseOver={()=>{
                    handleMouseOver()
                    setCurrentSlide(2)}
                }>
                <h3>ABOUT L'ESSENCE</h3>
                <h6>Formulated and personalized since 1994.</h6>
                <div className={`slider-learn learn-about ${currentSlide === 2 ? 'active' : 'deactive'}`}>
                    <a href="">learn more</a>
                </div>
            </div>
        </div>

    
    </div>
  )
}

export default BackgroundSlider
