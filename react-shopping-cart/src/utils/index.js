export function withOpacityValue(hexCode, opacity) {
  const red = hexCode.substring(1, 3);
  const green = hexCode.substring(3, 5);
  const blue = hexCode.substring(5);

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

export function findData(cartItem, data) {
  const productData = data.find(datum => cartItem.id === datum.id);
  return { ...productData, quantity: cartItem.quantity };
}
