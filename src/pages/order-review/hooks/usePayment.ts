import { useMemo } from 'react';

interface usePaymentInput {
  orderPrice: number;
  shippingFee: number;
  discount: number;
}

export const usePayment = ({
  orderPrice,
  shippingFee,
  discount,
}: usePaymentInput) => {
  return useMemo(() => {
    return orderPrice + shippingFee - discount;
  }, [orderPrice, shippingFee, discount]);
};
