import { useState } from "react";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import OrderDetails from "./OrderDetails";
import classes from "./OrdersTable.module.css";

const getTotalQuantity = (items) => {
  let total = items.reduce((prev, current) => {
    return prev + (+current.quantity);
  }, 0);
  return total;
}

const OrdersTable = ({ orders }) => {

  const [orderDetails, setOrderDetails] = useState(false); //Used for showing all details of a particular order
  
  return (
    <><table className={classes.table}>
      <thead className={classes.thead}>
        <tr>
          <td>Order Id</td>
          <td>Total Items</td>
          <td>
            <div className={classes["amount-cont"]}>
              Amount Paid (<CurrencyRupeeIcon fontSize="small" />)
            </div>
          </td>
        </tr>
      </thead>
      <tbody className={classes.tbody}>
        {orders.map((order) => {
          return (
            <tr key={order.id} className={classes.tr} onClick={() => setOrderDetails(order)}>
              <td>{order.id}</td>
              <td>{getTotalQuantity(order.orderItems)}</td>
              <td>{order.orderTotal.toFixed(2)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    {orderDetails && <OrderDetails orderDetails={orderDetails} setOrderDetails={setOrderDetails}/>}
    </>
  );
};

export default OrdersTable;
