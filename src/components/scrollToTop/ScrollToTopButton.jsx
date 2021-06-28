import { useEffect, useState } from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import classes from "./ScrollToTopButton.module.css";

const ScrollToTopButton = () => {
  // The back-to-top button is hidden at the beginning
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollToTop);
    
    function handleScrollToTop () {
      if (window.pageYOffset > 400) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }
    
    return () => {
      window.removeEventListener("scroll", handleScrollToTop);
    }
  }, []);

  // This function will scroll the window to the top 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
    });
  };

  return (
      showButton ? (
        <button className={classes.button} onClick={scrollToTop}><ArrowUpwardIcon className={classes.icon}/></button>
      ) : ''
  );
}

export default ScrollToTopButton;