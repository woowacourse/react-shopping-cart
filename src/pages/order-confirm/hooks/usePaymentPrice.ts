import { useCallback, useState } from "react";

type UsePaymentPriceParams = {
  orderTotalPrice: number;
  deliveryPrice: number;
};

export const usePaymentPrice = ({
  orderTotalPrice,
  deliveryPrice,
}: UsePaymentPriceParams) => {
  const [couponDiscount, setCouponDiscount] = useState(0);

  const applyCouponDiscount = useCallback((discountAmount: number) => {
    setCouponDiscount(discountAmount);
  }, []);

  return {
    couponDiscount,
    applyCouponDiscount,
    paymentPrice: orderTotalPrice + deliveryPrice - couponDiscount,
  };
};
