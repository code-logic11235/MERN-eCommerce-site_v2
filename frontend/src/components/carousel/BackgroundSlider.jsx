
import React, { useState } from 'react'

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
    console.log(slides[currentSlide], currentSlide)

    const bgImageStyle ={
        backgroundImage: `url(${slides[currentSlide].url})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '90%'
        }
  return (
    <div className='container-style'>
        {slides[currentSlide].type === 'video' ? 
         <video src={slides[currentSlide].url} autoPlay loop muted/>
         :
         <div style = {bgImageStyle}></div>
          }
          <button onClick={()=>{setCurrentSlide(currentSlide + 1)}}>NEXT</button>
          <button onClick={()=>{setCurrentSlide(currentSlide - 1)}}>BACK</button>

          <div id='content'>
            <div >
                section 1
            </div>
            <div >
                section 2
            </div>
            <div >
                about l’Essence
            </div>
        </div>

    
    </div>
  )
}

export default BackgroundSlider
