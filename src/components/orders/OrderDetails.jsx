import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Backdrop from "../UI/Backdrop";
import { getDate } from "../../utils";
import classes from "./OrderDetails.module.css";

const OrderDetailsOverlay = (props) => {
  const { orderDetails: order, setOrderDetails } = props;
  const orderDate = getDate(order.createdAt);

  return (
    <div className={classes.container}>
      <div className={classes.head}>
        <span>Order Id: {order.id}</span>
        <span
          className={classes["close-icon-container"]}
          onClick={() => setOrderDetails(false)}
        >
          <CloseIcon />
        </span>
      </div>
      <div className={classes.body}>
        <div className={classes.date}>{orderDate}</div>
        <table className={classes.table}>
          <thead>
            <tr>
              <td>Image</td>
              <td>Name</td>
              <td>Quantity</td>
              <td>
                <div className={classes["price-cont"]}>
                  Price (<CurrencyRupeeIcon fontSize="small" />)
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            {order.orderItems.map((orderItem) => (
              <tr key={orderItem.id}>
                <td>
                  <div className={classes["img-container"]}>
                    <img
                      alt="order"
                      className={classes.img}
                      src={orderItem.imageURL}
                    />
                  </div>
                </td>
                <td>{orderItem.name}</td>
                <td>X {orderItem.quantity}</td>
                <td>{orderItem.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={classes["order-total-container"]}>
          <span>Order Total: </span>
          <span className={classes["order-amount"]}>
            <CurrencyRupeeIcon fontSize="small" />
            {order.orderTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

const OrderDetails = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={() => props.setOrderDetails(false)} />,
        document.getElementById("backdrop-root")
      )}

      {ReactDOM.createPortal(
        <OrderDetailsOverlay {...props} />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default OrderDetails;
