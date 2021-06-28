import React from 'react';
import OrderConfirmationComp from "./OrderConfirmation";
import { Elements } from "@stripe/react-stripe-js";
import { publishableKey } from "../../stripe/config";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(publishableKey);

const OrderConfirmation = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <OrderConfirmationComp/>
      </Elements>
    </div>
  )
}

export default OrderConfirmation;

