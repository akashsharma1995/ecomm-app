import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import authSlice from './authSlice';
import productsSlice from './productsSlice';
import cartSlice from './cartSlice';
import ordersSlice from './ordersSlice';


const reducers = combineReducers({
  auth: authSlice.reducer,
  products: productsSlice.reducer,
  cart: cartSlice.reducer,
  orders: ordersSlice.reducer
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"]
}

const persistedReducers = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducers,
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;