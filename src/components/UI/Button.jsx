import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import classes from './Button.module.css';

// Accepts text, size, type, transparent, block props
// text: {
//   accepts:  type string
//   values: anything you specify
//   default value: button
//   desc: Text to be shown on button
// }, 
// type: {
//   accepts: type string
//   values: primary, secondary
//   default value: primary
//   desc: different styles of button depending on value
// },
// size: {
//   accepts: type string, 
//   values: sm, md, lg
//   default value: md
//   desc: different sizes of button depending on value
// },
// transparent: {
//   accepts: type boolean
//   values: true, false
//   default value: false
//   desc: if true button will be transparent 
// },
// block: {
//   accepts: type boolean,
//   values: true, false,
//   default value: false
//   desc: if true button will be a block level element
// }


const Button = ({children, size, btnType, transparent, block , className, disabled, loading, ...otherProps}) => {
  
  size = size ? size : 'md';
  btnType = btnType ? btnType : 'primary';
  transparent = transparent || false;
  block = block || false;
  loading = loading || false;

  const btnStyles = `${classes.btn} ${classes[size]} ${classes[btnType]} ${transparent ? classes.transparent : ''} ${block ? classes.block : ''} ${loading ? classes["btn-loading"] : ''} ${disabled ? classes.disabled : ''}`
  
  return (
    <button className={`${btnStyles} ${className}`} {...otherProps}>
      {children}
      {loading && <CircularProgress size="1rem" className={classes.loading}/>}
    </button>
  )
}

export default Button;
