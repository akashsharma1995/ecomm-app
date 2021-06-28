import React from "react";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import classes from "./Summary.module.css";

const Summary = ({ cartSummary }) => {
  const summaryItems = [
    { title: "Subtotal", value: cartSummary.subTotal },
    { title: "Shipping", value: cartSummary.shipping },
    { title: "Shipping Discount", value: cartSummary.shippingDiscount },
    { title: "Total", value: cartSummary.totalAmount },
  ];

  return (
    <div className={classes["summary-container"]}>
      <h2>Summary</h2>
      {summaryItems.map((item, i) => (
        <div key={item.title + i}>
          <span>{item.title}</span>
          <span className={classes["summary-price-cont"]}><CurrencyRupeeIcon/> {item.value?.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
};

export default Summary;
