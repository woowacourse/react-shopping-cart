import { DELIVERY_PRICE_THRESHOLD } from '../constants/config';
import { Coupon } from '../types';

export function isCouponValid(
  coupon: Coupon,
  context: {
    orderPrice: number;
    maxQuantity: number;
    currentHour: number;
  }
): boolean {
  const now = new Date();

  if (coupon.expirationDate) {
    const expire = new Date(coupon.expirationDate + 'T23:59:59');
    if (now > expire) return false;
  }

  switch (coupon.code) {
    case 'FIXED5000':
      return context.orderPrice >= (coupon.minimumAmount ?? 0);

    case 'BOGO':
      return (
        context.maxQuantity >=
        (coupon.buyQuantity ?? 0) + (coupon.getQuantity ?? 0)
      );

    case 'FREESHIPPING':
      return (
        context.orderPrice >= (coupon.minimumAmount ?? 0) &&
        context.orderPrice < DELIVERY_PRICE_THRESHOLD
      );

    case 'MIRACLESALE': {
      const { start = '00:00:00', end = '00:00:00' } =
        coupon.availableTime ?? {};
      const startHour = parseInt(start.slice(0, 2), 10);
      const endHour = parseInt(end.slice(0, 2), 10);
      return context.currentHour >= startHour && context.currentHour < endHour;
    }

    default:
      return false;
  }
}
