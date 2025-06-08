export const getDeliveryFee = (isChecked: boolean, totalPrice: number) => {
  if (10_0000 > totalPrice) {
    return isChecked ? 6000 : 3000;
  } else {
    return isChecked ? 3000 : 0;
  }
};
