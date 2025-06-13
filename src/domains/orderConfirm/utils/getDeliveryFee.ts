interface GetDeliveryFeeParams {
  orderPrice: number;
  isExtraDeliveryArea?: boolean;
}

export function getDeliveryFee({
  orderPrice,
  isExtraDeliveryArea = false,
}: GetDeliveryFeeParams) {
  const deliveryFee = 100_000 <= orderPrice ? 0 : 3_000;
  if (isExtraDeliveryArea) return deliveryFee + 3_000;
  return deliveryFee;
}
