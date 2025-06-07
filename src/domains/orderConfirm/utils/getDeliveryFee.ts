interface GetDeliveryFeeParams {
  totalPrice: number;
  isExtraDeliveryArea?: boolean;
}

export function getDeliveryFee({
  totalPrice,
  isExtraDeliveryArea = false,
}: GetDeliveryFeeParams) {
  const deliveryFee = 100_000 <= totalPrice ? 0 : 3_000;
  if (isExtraDeliveryArea) return deliveryFee + 3_000;
  return deliveryFee;
}
