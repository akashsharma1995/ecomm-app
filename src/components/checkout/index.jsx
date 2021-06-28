import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CurrencyRupee from "@mui/icons-material/CurrencyRupee";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import { checkAddressExists } from "../../utils";
import ShippingAddressModal from "../myAccountInfo/ShippingAddressModal";
import Button from "../UI/Button";
import Loading from "../UI/Loading";
import ShippingInfo from "./ShippingInfo";
import classes from "./Checkout.module.css";

const Checkout = () => {
  const { cart, auth } = useSelector((state) => state);
  const { user } = auth;
  const history = useHistory();
  const [showShippingAddressModal, setShowShippingAddressModal] =
    useState(false);

  const addressExists = checkAddressExists(user.address);

  if(!user) history.goBack();

  useEffect(() => {
    if (cart.totalQuantity === 0) {
      history.goBack();
    }
  }, []);

  return cart && cart.totalQuantity > 0 ? (
    <div className={classes.container}>
      <h2 className={classes.heading}>
        Shipping To <LocalShippingIcon />
      </h2>

      {addressExists ? (
        <ShippingInfo address={user.address} name={user.displayName} />
      ) : (
        <Button btnType="primary" className={classes.button} block>
          Add Shipping Address
        </Button>
      )}

      <h3 className={classes["amount-container"]}>
        Total Amount to Pay : <CurrencyRupee />{" "}
        {cart.cartSummary.totalAmount.toFixed(2)}
      </h3>

      <Button
        disabled={!addressExists ? true : false}
        block
        btnType="primary"
        onClick={() => history.push("/payment")}
      >
        Proceed to Pay
      </Button>
      {showShippingAddressModal && (
        <ShippingAddressModal
          setShowShippingAddressModal={setShowShippingAddressModal}
          address={user.address}
          type={"add"}
        />
      )}
    </div>
  ) : (
    <Loading loading={true} />
  );
};

export default Checkout;
