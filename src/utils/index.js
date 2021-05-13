export const getTotalPrice = products => {
  return products.reduce((totalPrice, { price, quantity, isChecked }) => {
    return isChecked ? (totalPrice += price * quantity) : totalPrice;
  }, 0);
};

export const getTotalQuantity = products => {
  return products.reduce((totalQuantity, { quantity, isChecked }) => {
    return isChecked ? (totalQuantity += quantity) : totalQuantity;
  }, 0);
};

export const formatPrice = price =>
  new Intl.NumberFormat('ko-KR').format(price);
