import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from 'react-redux';

import Button from "../UI/Button";
import { cartActions } from "../../store/cartSlice";

import classes from "./QuantityManipulator.module.css";

const QuantityManipulator = ({ productDetails }) => {
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(cartActions.addToCart(productDetails));
  }

  const removeFromCartHandler = () => {
    dispatch(cartActions.removeFromCart(productDetails));
  }

  return (
    <div className={classes["quantity-manipulator"]}>
      <Button size="sm" btnType="secondary" className={classes.button} onClick={() => removeFromCartHandler(productDetails.id)}>
        <RemoveIcon/>
      </Button>
      <div>{productDetails.quantity}</div>
      <Button size="sm" btnType="secondary" className={classes.button} onClick={() => addToCartHandler(productDetails)}>
        <AddIcon/>
      </Button>
    </div>
  );
};

export default QuantityManipulator;
