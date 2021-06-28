import React from 'react';
import classes from './Backdrop.module.css';

const Backdrop = ({className, ...otherProps}) => {
  return (
    <div className={`${classes.container} ${classes.loading} ${className}`} {...otherProps}></div>
  )
}

export default Backdrop;