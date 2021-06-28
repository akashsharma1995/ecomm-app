import React from 'react';
import classes from './Card.module.css';
// import FavoriteIcon from '@mui/icons-material/Favorite';

const Card = (props) => {
  const { image } = props;
  return (
    <div className={classes.container} onClick={() => props.onClick()}>
      <div className={classes["image-container"]}>
        <img alt="product" src={image} className={classes.image} loading="lazy"></img>
      </div>
      {/* <span className={classes["heart-container"]}><FavoriteIcon className={favourite ? classes['heart-red'] : classes['heart-grey']}/></span> */}
      <div className={classes.cardbody}>{props.children}</div>
    </div>
  )
}

export default Card
