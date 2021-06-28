import { createSlice } from "@reduxjs/toolkit";

// This slice is responsible for storing all wishlisted products
const initialState = {
  products: []
}

const wishlistSlice = createSlice({
  name: wishlist,
  initialState,
  reducers: {
    moveToCart(state, action) {
      state.products = state.products.filter(item => item.id !== action.payload);
    },
    removeFromWishlist(state, action) {
      state.products = state.products.filter(item => item.id !== action.payload);
    }
  }
});

export default wishlistSlice;
export const wishlistActions = wishlistSlice.actions;