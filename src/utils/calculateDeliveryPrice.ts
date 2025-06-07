import { DELIVERY_PRICE, DELIVERY_PRICE_THRESHOLD } from '../constants/config';

export default function calculateDeliveryPrice(
  orderPrice: number,
  isRemoteArea = false
): number {
  let price = 0;
  if (orderPrice === 0 || orderPrice >= DELIVERY_PRICE_THRESHOLD) {
    price = 0;
  } else {
    price = DELIVERY_PRICE;
  }
  if (isRemoteArea && price > 0) {
    price += 3000;
  }
  return price;
}
