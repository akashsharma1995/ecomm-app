const calculateCartSummary = (cartItems, shipping, shippingDiscount) => {
    
  const subTotal = cartItems.reduce((prevValue, currentValue) => {
      return prevValue + (+currentValue.quantity * +currentValue.price)
    }, 0);

  const totalAmount = subTotal + (+shipping) - (+shippingDiscount);

  return {
    subTotal,
    shipping,
    shippingDiscount,
    totalAmount
  }
}

export default calculateCartSummary;