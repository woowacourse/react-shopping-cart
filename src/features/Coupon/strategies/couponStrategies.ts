import { FREE_DELIVERY_THRESHOLD } from '../../../features/Cart/constants/price';
import { Coupon } from '../types/Coupon.types';
import { CouponStrategy } from '../types/CouponStrategy.types';

export const couponStrategies: Record<Coupon['discountType'], CouponStrategy> = {
  fixed: {
    validate: (coupon, _items, { totalPrice }) => {
      return (
        (!coupon.minimumAmount || totalPrice >= coupon.minimumAmount) &&
        (!coupon.expirationDate || new Date(coupon.expirationDate) > new Date())
      );
    },
    calculate: (coupon) => coupon.discount ?? 0,
  },

  percentage: {
    validate: (coupon, _items) => {
      if (coupon.expirationDate && new Date(coupon.expirationDate) < new Date()) return false;
      if (coupon.availableTime) {
        const currentHour = new Date().getHours();
        const start = Number(coupon.availableTime.start.split(':')[0]);
        const end = Number(coupon.availableTime.end.split(':')[0]);
        if (currentHour < start || currentHour >= end) return false;
      }
      return true;
    },
    calculate: (coupon, _items, { totalPrice }) => {
      return Math.floor(totalPrice * ((coupon.discount ?? 0) / 100));
    },
  },

  buyXgetY: {
    validate: (coupon, items) => items.some((item) => item.quantity >= (coupon.buyQuantity ?? 2)),
    calculate: (_coupon, items) => {
      const eligible = items.filter((item) => item.quantity >= 2);
      if (eligible.length === 0) return 0;
      return Math.max(...eligible.map((item) => item.product.price));
    },
  },

  freeShipping: {
    validate: (coupon, _items, { totalPrice }) =>
      !coupon.minimumAmount || totalPrice >= coupon.minimumAmount,
    calculate: (_coupon, _items, { isRemoteArea, totalPrice }) => {
      if (totalPrice >= FREE_DELIVERY_THRESHOLD) return 0;
      return isRemoteArea ? 6000 : 3000;
    },
  },
};
