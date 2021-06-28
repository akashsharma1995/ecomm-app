import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Summary from "./Summary";
import Button from "../UI/Button";
import TopSection from "./TopSection";
import CartProducts from "./CartProducts";
import Loading from "../UI/Loading";
import classes from "./Cart.module.css";

const Cart = () => {
  const history = useHistory();
  const { cartItems, totalQuantity, cartSummary } = useSelector(
    (state) => state.cart
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [cartItems, totalQuantity]);

  const NoItemsFound = (
    <>
      <h1>Hey, it feels so light!</h1>
      <p className={classes.noitems}>
        There is nothing in your cart. Let's add some items.
      </p>
    </>
  );

  return (
    <Fragment>
      {!loading && (
        <div className={classes.container}>
          {cartItems.length === 0 && NoItemsFound}
          {cartItems.length > 0 && (
            <>
              <h1>Your Bag</h1>

              <TopSection totalQuantity={totalQuantity} />

              <div className={classes.wrapper}>
                <CartProducts cartItems={cartItems} />

                <Summary cartSummary={cartSummary} />
              </div>
            </>
          )}
          {/* This button only shows up in mobile view */}
          {cartItems.length > 0 && (
            <Button
              onClick={() => history.push("/checkout")}
              className={classes["checkout-btn"]}
              btnType="secondary"
            >
              Checkout Now
            </Button>
          )}
        </div>
      )}

      {loading && <Loading />}
    </Fragment>
  );
};

export default Cart;
