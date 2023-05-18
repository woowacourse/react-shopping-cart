import { DELIVERY_FEE } from '@Constants/index';

const usePaymentAmount = (allPrice: number) => {
  const orderAmount = `${allPrice.toLocaleString()} 원`;
  const deliveryFee = !allPrice ? `0 원` : `${DELIVERY_FEE.toLocaleString()} 원`;
  const totalOrderPrice = `${(allPrice + (!allPrice ? 0 : DELIVERY_FEE)).toLocaleString()} 원`;

  return { orderAmount, deliveryFee, totalOrderPrice };
};

export default usePaymentAmount;
