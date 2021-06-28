import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import classes from "./Payment.module.css";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${process.env.REACT_APP_HOSTING_URL}/order-confirmation`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <form
      id="payment-form"
      className={classes["payment-form"]}
      onSubmit={handleSubmit}
    >
      <PaymentElement
        id="payment-element"
        className={classes["payment-element"]}
      />
      {stripe && elements && (
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className={classes.button}
        >
          <span id="button-text" className={classes["button-text"]}>
            {isLoading ? (
              <div className={classes["spinner"]} id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
      )}
      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" className={classes["payment-message"]}>
          {message}
        </div>
      )}
    </form>
  );
}
