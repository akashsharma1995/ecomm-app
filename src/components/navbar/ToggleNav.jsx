import React from 'react';
import classes from './Navbar.module.css';

const ToggleNav = (props) => {
  return (
    <div className={classes["toggle-button"]} onClick={() => props.setShowDrawer(true)}>
      <span className={classes.bar}></span>
      <span className={classes.bar}></span>
      <span className={classes.bar}></span>
    </div>
  )
}

export default ToggleNav;