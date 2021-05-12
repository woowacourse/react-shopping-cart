export const getTotalPrice = products => {
  return products.reduce((totalPrice, { price, quantity, isChecked }) => {
    return isChecked ? (totalPrice += price * quantity) : totalPrice;
  }, 0);
};

export const getTotalQuantity = products => {
  return products.reduce((totalQuantity, { quantity }) => {
    return (totalQuantity += quantity);
  }, 0);
};
