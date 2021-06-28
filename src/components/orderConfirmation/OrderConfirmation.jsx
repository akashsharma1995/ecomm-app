import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import WarningIcon from "@mui/icons-material/Warning";
import { useStripe } from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { createOrder } from "../../store/ordersSlice";
import Button from "../UI/Button";
import Loading from "../UI/Loading";
import classes from "./OrderConfirmation.module.css";
import { cartActions } from "../../store/cartSlice";


const IconComp = ({ message }) => {
  if (message === "Payment succeeded!") {
    return (
      <span
        className={`${classes["icon-container"]} ${classes["icon-success-cont"]}`}
      >
        <CheckIcon className={classes.icon} />
      </span>
    );
  }
  if (
    message === "Your payment was not successful, please try again." ||
    message === "Something went wrong!"
  ) {
    return (
      <span
        className={`${classes["icon-container"]} ${classes["icon-failure-cont"]}`}
      >
        <ClearIcon className={classes.icon} />
      </span>
    );
  }
  if (message === "Your payment is processing.") {
    return (
      <span>
        <WarningIcon className={classes["icon-warning"]} />
      </span>
    );
  } else {
    return <div></div>;
  }
};

const OrderConfirmation = () => {
  const stripe = useStripe();
  const history = useHistory();
  const dispatch = useDispatch();
  const { cart, auth, orders } = useSelector((state) => state);
  const { cartItems, cartSummary, totalQuantity } = cart;
  const { createOrderSuccess, createOrderError } = orders;
  const [message, setMessage] = useState("");
  const [orderCreated, setOrderCreated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      const configOrder = {
        userId: auth.user.id,
        orderTotal: cartSummary.totalAmount,
        orderItems: cartItems.map((item) => {
          const { id, imageURL, name, price, quantity, size } = item;

          return {
            id,
            imageURL,
            name,
            price,
            quantity,
            size
          };
        }),
      };

      configOrder.createdAt = new Date();

      if(totalQuantity > 0){
        dispatch(createOrder(configOrder));
      }

      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong!");
          break;
      }
    });
  }, [stripe]);

  useEffect(() => {
    if (createOrderSuccess === true) {
      dispatch(cartActions.clearCart());
      setOrderCreated(true);
      setLoading(false);
    }
  }, [createOrderSuccess, dispatch]);

  useEffect(() => {
    if(createOrderError){
      setLoading(false);
      setMessage(createOrderError);
    }
  }, [createOrderError])

  return (
    <div className={classes.container}>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <IconComp message={message} />
          <div className={message ? classes["msg-container"] : ""}>
            {message}
          </div>
          {orderCreated && (
            <Fragment>
              <h3>Your order has been placed successfully.</h3>
              <div>
                <Button btnType="primary" onClick={() => history.push("/")}>
                  Continue Shopping
                </Button>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default OrderConfirmation;
