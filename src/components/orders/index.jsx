import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../store/ordersSlice";
import Loading from "../UI/Loading";
import SnackbarComp from "../UI/SnackbarComp";
import classes from "./Orders.module.css";
import OrderCards from "./OrderCards";
import OrdersTable from "./OrdersTable";

const notificationState = {
  open: false,
  type: "",
  message: "",
};

const Orders = () => {
  const { orders, auth } = useSelector((state) => state);
  const { orders:ordersFetched , fetchOrdersSuccess, fetchOrdersError } = orders;
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(notificationState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders(auth.user.id));
  }, [dispatch]);

  useEffect(() => {
    if (fetchOrdersSuccess) {
      setLoading(false);
    }
  }, [fetchOrdersSuccess]);

  useEffect(() => {
    if(fetchOrdersError){
      setLoading(false);
      setShowNotification({
        open: true,
        type: "error",
        message: fetchOrdersError,
      });
    }
  }, [fetchOrdersError])

  return (
    <div className={classes.container}>
      <h2>Orders</h2>
      {loading ? (
        <div className={classes["loading-cont"]}><Loading /></div>
      ) : (
        
          ordersFetched.length > 0 ?
          <>
            <OrdersTable orders={ordersFetched}/>
            <OrderCards orders={ordersFetched}/>
          </> : <h3 className={classes["no-orders-text"]}>No previous orders found!</h3>
      )}
      
      {showNotification.open && (
        <SnackbarComp
          open={showNotification.open}
          setShowNotification={setShowNotification}
          type={showNotification.type}
          message={showNotification.message}
        />
      )}
    </div>
  );
};

export default Orders;
