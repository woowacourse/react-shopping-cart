export const getTotalPrice = products => {
  return products.reduce((totalPrice, { price, quantity }) => {
    return (totalPrice += price * quantity);
  }, 0);
};

export const getTotalQuantity = products => {
  return products.reduce((totalQuantity, { quantity }) => {
    return (totalQuantity += quantity);
  }, 0);
};
