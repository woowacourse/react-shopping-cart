type GetPaymentPriceParams = {
  orderTotalPrice: number;
  deliveryPrice: number;
  couponDiscount: number;
};

export const getPaymentPrice = ({
  orderTotalPrice,
  deliveryPrice,
  couponDiscount,
}: GetPaymentPriceParams) => {
  return orderTotalPrice + deliveryPrice - couponDiscount;
};
