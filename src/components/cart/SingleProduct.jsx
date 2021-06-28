import React from "react";
import { useHistory } from "react-router-dom";
import QuantityManipulator from "../quantityManipulator";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import classes from "./SingleProduct.module.css";

const SingleProduct = ({ productDetails }) => {
  const history = useHistory();
  const { id, imageURL, name, size, price} = productDetails;
  return (
    <div className={classes["product-details-cont"]}>
      <div className={classes["section-1"]} onClick={() => history.push(`/product-details/${id}`)}>
        <img
          className={classes.image}
          alt="product"
          src={imageURL}
        />
      </div>

      <div className={classes["section-2"]}>
        <div>
          <b>Product:</b> {name}
        </div>
        {size && (
          <div>
            <b>Size: </b>
            {size}
          </div>
        )}
      </div>

      <div className={classes["section-3"]}>
        <QuantityManipulator productDetails={productDetails} />
        <div>
          <CurrencyRupeeIcon /> {price}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
