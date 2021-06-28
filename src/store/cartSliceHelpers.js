const calculateCartSummary = (cartItems, shipping, shippingDiscount) => {
    
  const subTotal = cartItems.reduce((prevValue, currentValue) => {
      return prevValue + (+currentValue.quantity * +currentValue.price)
    }, 0);

  const totalAmount = subTotal + (+shipping) - (+shippingDiscount);
  const summary = {
    subTotal,
    shipping,
    shippingDiscount,
    totalAmount
  }
  return summary;
}

const getExistingItemIndex = (cartItems, item) => {
  const existingItemIndex = cartItems.findIndex(
    (cartItem) => {
      let found;
      if(cartItem.id.toString() === item.id.toString()){
        if(!item.size){
          found = true;
        }
        else if(item.size && cartItem.size === item.size){
          found = true;
        }
      }
      return found;
    }
  );

  return existingItemIndex;
}

export { calculateCartSummary, getExistingItemIndex };