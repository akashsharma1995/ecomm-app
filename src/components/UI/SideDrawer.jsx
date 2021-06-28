import React, { useState, useEffect } from 'react';
import CloseIcon from "@mui/icons-material/Close";
import ReactDOM from 'react-dom';
import Backdrop from "./Backdrop";
import classes from "./SideDrawer.module.css";

const SideDrawerOverlay = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes["close-cont"]}>
        <CloseIcon className={classes.close} onClick={() => props.setShowDrawer(false)} />
      </div>
      {props.children}
    </div>
  )
}

const SideDrawer = ({setShowDrawer, showDrawer, ...otherProps}) => {
  const [ open ] = useState(showDrawer);
  
  useEffect(() => {
    if(open){
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  return (
    <div>
      {ReactDOM.createPortal(
        <Backdrop onClick={() => setShowDrawer(false)} />,
        document.getElementById("backdrop-root")
      )}

      {ReactDOM.createPortal(
        <SideDrawerOverlay {...otherProps}/>,
        document.getElementById("overlay-root")
      )}
    </div>
  )
}

export default SideDrawer
