import React from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { getDate } from "../../utils";
import classes from "./OrderCards.module.css";

const OrderCard = ({ order }) => {
  const { orderTotal, createdAt } = order;
  const orderDate = getDate(createdAt);
  return (
    <div className={classes.container}>
      <div className={classes.date}>Ordered on: {orderDate}</div>
      {order.orderItems.map((orderItem, i) => (
        <div className={classes["order-items"]} key={orderItem.id + i}>
          <div className={classes["image-cont"]}>
            <img
              src={orderItem.imageURL}
              alt="product"
              className={classes.image}
            />
          </div>
          <div className={classes["quantity-cont"]}>
            X {orderItem.quantity} {orderItem.size && ` ( ${orderItem.size} )`}
          </div>
          <div className={classes["price-cont"]}>
            <CurrencyRupeeIcon fontSize="small" />
            {orderItem.price}
          </div>
          <div className={classes["name-cont"]}>{orderItem.name}</div>
        </div>
      ))}
      <div className={classes["total-cont"]}>
        <span>Total Amount Paid: </span>
        <span>
          <CurrencyRupeeIcon fontSize="small" />
          {orderTotal}
        </span>
      </div>
    </div>
  );
};

const OrderCards = ({ orders }) => {
  return (
    <div className={classes.cards}>
      {orders.map((order) => {
        return <OrderCard key={order.id} order={order} />;
      })}
    </div>
  );
};

export default OrderCards;
