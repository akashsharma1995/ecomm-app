import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { Prompt } from "react-router-dom";

import PaymentForm from "./PaymentForm";
import Loading from "../UI/Loading";
import { publishableKey } from "../../stripe/config";
import { checkAddressExists } from "../../utils";
import classes from "./Payment.module.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(publishableKey);

export default function Payment() {
  const [clientSecret, setClientSecret] = useState("");
  const history = useHistory();
  const { cart, auth } = useSelector((state) => state);
  const { user } = auth;
  const { cartItems, totalQuantity } = cart;

  useEffect(() => {
    if (totalQuantity < 1) history.goBack();
    if (checkAddressExists(user.address) === false) history.push("/checkout");

    const shipping = {
      name: user.displayName,
      address: {
        line1: user.address.addr_line_1,
        line2: user.address.addr_line_2,
        city: user.address.city,
        state: user.address.state,
        postal_code: user.address.zip_code,
        country: user.address.country,
      },
    };
    // Create PaymentIntent as soon as the page loads
    fetch(`${process.env.REACT_APP_PAYMENT_REDIRECT_URL}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [...cartItems], shipping }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.log(err));
  }, [cartItems, history, totalQuantity, user.address, user.displayName]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className={classes.container}>
      <div className={classes.demo}>Pay for demo purpose using CARD No. : 4242424242424242, MM/YY: 04/24, CVC: 424</div>
      {/* Component that asks for confirmation while leaving the page */}
      {/* <Prompt
        when={blockNavigation}
        message="Are you sure you want to cancel payment?"
      /> */}

      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      ) : (
        <Loading />
      )}
    </div>
  );
}
