import { CouponsResponse } from '../types/coupons';
import { Content } from '../types/cartItems';

interface CanAdjustCouponParams {
  coupon: CouponsResponse;
  orderPrice: number;
  selectedItems: Content[];
  currentTime?: Date;
}

export function canAdjustCoupon({
  coupon,
  orderPrice,
  selectedItems,
  currentTime = new Date(),
}: CanAdjustCouponParams): boolean {
  const hour = currentTime.getHours();

  switch (coupon.description) {
    case '5,000원 할인 쿠폰':
      return orderPrice >= (coupon.minimumAmount ?? 0);

    case '2개 구매 시 1개 무료 쿠폰': {
      const counts = new Map<number, number>();
      selectedItems.forEach((item) => {
        const id = item.product.id;
        counts.set(id, (counts.get(id) ?? 0) + item.quantity);
      });
      return Array.from(counts.values()).some((count) => count >= (coupon.buyQuantity ?? 2));
    }

    case '5만원 이상 구매 시 무료 배송 쿠폰':
      return orderPrice >= (coupon.minimumAmount ?? 0);

    case '미라클모닝 30% 할인 쿠폰': {
      const startHour = Number(coupon.availableTime?.start.split(':')[0]);
      const endHour = Number(coupon.availableTime?.end.split(':')[0]);
      return hour > startHour && hour < endHour;
    }

    default:
      return false;
  }
}
