export const FREE_DELIVERY_LIMIT = 100_000;
const DELIVERY_FEE = 3_000;

export const calculateDeliveryFee = (orderAmount: number): number => {
  return orderAmount >= FREE_DELIVERY_LIMIT ? 0 : DELIVERY_FEE;
};

export const calculatePaymentAmount = (orderAmount: number): number => {
  return orderAmount + calculateDeliveryFee(orderAmount);
};

export const calculatePaymentInfo = (orderAmount: number) => {
  const deliveryFee = calculateDeliveryFee(orderAmount);
  const paymentAmount = orderAmount + deliveryFee;

  return {
    deliveryFee,
    paymentAmount,
  };
};
