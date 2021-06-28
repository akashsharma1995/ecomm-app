import React from "react";
import classes from "./Checkout.module.css";

const ShippingInfo = ({ name, address }) => {
  const { addr_line_1, addr_line_2, city, state, zip_code, country } = address;
  return (
    <div className={classes["shipping-info-container"]}>
      <h3>{name}</h3>
      <p>
        {addr_line_1 +
          ", " +
          addr_line_2 +
          ", " +
          city +
          ", " +
          state +
          ", " +
          zip_code +
          ", " +
          country}
      </p>
    </div>
  );
};

export default ShippingInfo;
