export function withOpacityValue(hexCode, opacity) {
  const red = hexCode.substring(1, 3);
  const green = hexCode.substring(3, 5);
  const blue = hexCode.substring(5);

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

export function addQuantityData(cartItem, data) {
  const productData = data.find(datum => cartItem.id === datum.id);
  return { ...productData, quantity: cartItem.quantity };
}

export function calculatePrice(data, shoppingCart, orderList) {
  const orderItemData = data.filter(({ id }) => orderList.includes(id));
  const orderItemInfoList = shoppingCart
    .filter(cartItem => orderList.includes(cartItem.id))
    .map(orderItem => addQuantityData(orderItem, orderItemData));

  return orderItemInfoList.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
}
