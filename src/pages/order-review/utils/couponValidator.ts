import { Cart } from '@/api/cart';
import { CouponContent } from '@/api/type';
import { isCouponValid } from './isCouponValid';

const COUPON_TYPE = {
  FIXED5000: 'FIXED5000',
  BOGO: 'BOGO',
  FREESHIPPING: 'FREESHIPPING',
  MIRACLESALE: 'MIRACLESALE',
};

export const couponValidator = (
  coupons: CouponContent[],
  isJejuOrRemoteArea: boolean,
  orderItemList: Cart[],
  orderPrice: number
) => {
  const availableCoupons: CouponContent[] = [];

  coupons.forEach((coupon) => {
    if (!isCouponValid(coupon)) return;

    if (coupon.code === COUPON_TYPE.FIXED5000) {
      // 주문금액 10만원 이상
      if (orderPrice >= 100_000) {
        availableCoupons.push(coupon);
      }
    }

    if (coupon.code === COUPON_TYPE.BOGO) {
      // 3개 이상인 상품이 한개라도 있으면
      const eligibleItems = orderItemList.filter((item) => item.quantity >= 3);
      if (eligibleItems.length > 0) {
        availableCoupons.push(coupon);
      }
    }

    if (coupon.code === COUPON_TYPE.FREESHIPPING) {
      // 도서산간 여부와 주문금액
      if (isJejuOrRemoteArea) {
        if (orderPrice >= 50_000) {
          availableCoupons.push(coupon);
        }
      } else {
        if (orderPrice >= 50_000 && orderPrice < 100_000) {
          availableCoupons.push(coupon);
        }
      }
    }

    if (coupon.code === COUPON_TYPE.MIRACLESALE) {
      // 시간 조건 (예시: 오전 4~7시)
      const now = new Date();
      const hour = now.getHours();
      if (hour >= 4 && hour < 7) {
        availableCoupons.push(coupon);
      }
    }
  });

  return availableCoupons;
};
