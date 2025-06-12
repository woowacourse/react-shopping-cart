import { DELIVERY_PRICE, DELIVERY_PRICE_THRESHOLD } from '../constants/config';

export default function calculateDeliveryPrice(
  orderPrice: number,
  isRemoteArea = false
): number {
  const basePrice =
    orderPrice === 0 || orderPrice >= DELIVERY_PRICE_THRESHOLD
      ? 0
      : DELIVERY_PRICE;

  return isRemoteArea && basePrice > 0 ? basePrice + 3000 : basePrice;
}
