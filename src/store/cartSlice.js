import { createSlice } from "@reduxjs/toolkit";
import { calculateCartSummary, getExistingItemIndex } from "./cartSliceHelpers";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  cartSummary: {
    subTotal: 0,
    shipping: 250,
    shippingDiscount: 250,
    totalAmount: 0,
  },
};
const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    removeFromCart(state, action) {
      const item = action.payload; //Getting item to be removed
      const existingItemIndex = getExistingItemIndex(state.cartItems, item);
      if (existingItemIndex === -1) return; //If item does not exists (It will never happen still an extra check)
      let existingItem = state.cartItems[existingItemIndex];
      state.totalQuantity--; //total quantity will always be reduced by 1 per function call

      let updatedCartItems = [...state.cartItems];
      if (existingItem.quantity.toString() === "1") {
        // If item has quantity = 1 then removing it from cartItems
        updatedCartItems.splice(existingItemIndex, 1);
      } else {
        // If item has quantity > 1 then updating its quantity in cartItems
        updatedCartItems = state.cartItems.map((cartItem, i) => {
          if (i === existingItemIndex) cartItem.quantity--;
          return cartItem;
        });

      }
      state.cartItems = updatedCartItems;
      state.cartSummary = calculateCartSummary(
        updatedCartItems,
        state.cartSummary.shipping,
        state.cartSummary.shippingDiscount
      );
    },
    addToCart(state, action) {
      const item = action.payload;
      const existingItemIndex = getExistingItemIndex(state.cartItems, item);

      let existingItem = state.cartItems[existingItemIndex];
      state.totalQuantity++; //total quantity will always be increased by 1 per function call

      let updatedCartItems = [...state.cartItems];
      if (existingItem?.quantity > 0) {
        // If item has quantity > 1 then updating its quantity in cartItems
        // state.cartItems[existingItemIndex].quantity++;
        updatedCartItems[existingItemIndex].quantity++;
      } else {
        // If item does not exists then, adding it to cartItems
        updatedCartItems.push(item);
      }
      state.cartItems = updatedCartItems;
      state.cartSummary = calculateCartSummary(
        updatedCartItems,
        state.cartSummary.shipping,
        state.cartSummary.shippingDiscount
      );
    },

    clearCart(state, action) {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.cartSummary = {...initialState.cartSummary}
    }
  },
});

export default cartSlice;
export const cartActions = cartSlice.actions;
