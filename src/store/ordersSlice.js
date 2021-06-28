import { createSlice } from '@reduxjs/toolkit';
import { db, addDoc, collection, query, where, getDocs } from '../firebase/utils';

// This slice is responsible for maintaining authentication state accessible to all the components
const initialState = {
  orders: [],
  fetchOrdersSuccess: false,
  fetchOrdersError: null,

  createOrderSuccess: false,
  createOrderError: null
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers : {
    setOrders(state, action) {
      state.orders = action.payload;
      state.fetchOrdersSuccess = true;
    },

    setFetchOrdersError(state, action) {
      state.fetchOrdersError = action.payload;
    },
    
    createOrderSuccess(state, action) {
      state.createOrderSuccess = action.payload;
    },
  
    setCreateOrderError(state, action) {
      state.createOrderError = action.payload;
    }
  }
});

export default ordersSlice;

export const ordersActions = ordersSlice.actions;

export const createOrder = (orderDetails) => {
  return async (dispatch) => {
    try{
      await addDoc(collection(db, "orders"), orderDetails);
      dispatch(ordersActions.createOrderSuccess(true));
    }catch (error){
      dispatch(ordersActions.setCreateOrderError(error.message ? error.message : error));
    }
  }
}

export const fetchOrders = (userId) => {
  return async (dispatch) => {
    try{
      const orders = [];
      const q = query(collection(db, "orders"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const docData = {...doc.data()};
        docData.createdAt = new Date(docData.createdAt.seconds * 1000).toString()
        // doc.data() is never undefined for query doc snapshots
        orders.push({id: doc.id, ...docData});
      });
      dispatch(ordersActions.setOrders(orders));
    }catch(error){
      console.log(error)
      dispatch(ordersActions.setFetchOrdersError(error.message.toString()));
    }
  }
}