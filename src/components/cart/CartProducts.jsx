import React from "react";
import SingleProduct from "./SingleProduct";

import classes from "./CartProducts.module.css";

const CartProducts = ({ cartItems }) => {
  return (
    <div className={classes.info}>
      {cartItems.map((product, i) => {
        return <SingleProduct key={product.id + i} productDetails={product} />;
      })}
    </div>
  );
};

export default CartProducts;