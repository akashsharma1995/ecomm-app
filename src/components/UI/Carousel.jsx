import React, { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import classes from './Carousel.module.css';

const carouselImages = [
  {
    path: "https://firebasestorage.googleapis.com/v0/b/ecomm-app-react.appspot.com/o/ecommbanner1.webp?alt=media&token=b0583d0e-9964-4e75-99ae-884f290991bb"
  },
  {
    path: "https://firebasestorage.googleapis.com/v0/b/ecomm-app-react.appspot.com/o/ecommbanner2.webp?alt=media&token=bb973108-a711-4ce2-9aa1-04fa31ddd1f0"
  },
  {
    path: "https://firebasestorage.googleapis.com/v0/b/ecomm-app-react.appspot.com/o/ecommbanner3.webp?alt=media&token=b9a3ec94-e3ae-4463-af1e-1fdb44bdb56b"
  }
]

const Carousel = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === 'left') setSlideIndex(prevIndex => prevIndex > 0 ? prevIndex - 1 : 2);
    if (direction === 'right') setSlideIndex(prevIndex => prevIndex < 2 ? prevIndex + 1 : 0);
  } 

  return (
    <div className={classes.container}>
      <span className={`${classes.arrow} ${classes.arrowleft}`} onClick={() => handleClick('left')}>
        <ArrowBackIosNewIcon/>
      </span>
      <div className={classes.wrapper}>
        <div style={{transform: `translateX(${slideIndex ? (slideIndex* -100) : 0}vw)`}} className={classes.slide}>
          {
            carouselImages.map((image, index) => <img key={`${image.path}carousel`} className={classes.images} src={image.path} alt="carousel"/>)
          }
        </div>
      </div>
      <span className={`${classes.arrow} ${classes.arrowright}`}  onClick={() => handleClick('right')}>
        <ArrowForwardIosIcon/>
      </span>
    </div>
  )
}

export default Carousel;
