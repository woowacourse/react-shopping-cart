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
  return orderPrice + shippingFee - discount;
};
