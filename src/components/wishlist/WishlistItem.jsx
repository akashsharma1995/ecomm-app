import React from "react";

import classes from "./Cart.module.css";

const WishlistItem = ({
  productDetails
}) => {


  return (
    <div className={classes["product-details-cont"]}>
      <div className={classes["product-details1"]}>
        <img
          className={classes.image}
          alt="product"
          src={productDetails.image}
        />
        <div className={classes["product-info"]}>
          <div>
            <b>Product:</b> {productDetails.title}
          </div>
          <div>
            <b>Product ID: </b>
            {productDetails.id}
          </div>
          <div>
            <b>Size: </b>
            {productDetails.size}
          </div>
        </div>
      </div>

      <div className={classes["product-details2"]}>
        <button>Move to cart</button>
      </div>
    </div>
  );
};

export default WishlistItem;
