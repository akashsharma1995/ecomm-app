import React, { Fragment } from "react";

import classes from "./Input.module.css";

const Input = ({ label, icon, ...otherProps }) => {
  return (
    <Fragment>
      <label>{label}</label>
      {
        icon ? 
        <div className={classes["input-container"]}>
          {icon && icon}
          <input className={classes["input-with-icon"]} {...otherProps}></input>
        </div> : 
        <input className={classes.input} {...otherProps}></input>
      }
      
    </Fragment>
  )
}

export default Input;
