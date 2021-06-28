import React from "react";
import { useHistory } from "react-router-dom";

import Button from "../UI/Button";
import classes from "./TopSection.module.css";

const TopSection = ({ totalQuantity }) => {
  const history = useHistory();
  return (
    <div className={`${classes.wrapper} ${classes["top-section"]}`}>
      <Button
        onClick={() => history.push("/")}
        className={classes["continue-shopping-btn"]}
        btnType="secondary"
      >
        Continue Shopping
      </Button>
      <div>
        <span className={classes["shopping-bag"]}>
          Shopping Bag({totalQuantity})
        </span>
      </div>
      <Button
        onClick={() => history.push("/checkout")}
        className={classes["checkout-btn"]}
        btnType="secondary"
      >
        Checkout Now
      </Button>
    </div>
  );
};

export default TopSection;
