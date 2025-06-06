export const FREE_DELIVERY_LIMIT = 100_000;
const DELIVERY_FEE = 3_000;

export const calculateDeliveryFee = (orderPrice: number): number => {
  return orderPrice >= FREE_DELIVERY_LIMIT ? 0 : DELIVERY_FEE;
};

export const calculatePaymentAmount = (orderPrice: number): number => {
  return orderPrice + calculateDeliveryFee(orderPrice);
};

export const calculatePaymentInfo = (orderPrice: number) => {
  const deliveryFee = calculateDeliveryFee(orderPrice);
  const orderTotalPrice = orderPrice + deliveryFee;

  return {
    deliveryFee,
    orderTotalPrice,
  };
};
