import { Coupon } from 'types/Coupon.type';

export const fixedCoupon: Coupon = {
  id: 1,
  code: 'FIXED5000',
  description: '5,000원 할인 쿠폰',
  discount: 5_000,
  discountType: 'fixed',
  minimumAmount: 100_000,
  expirationDate: '2024-11-30',
};

export const bogoCoupon: Coupon = {
  id: 2,
  code: 'BOGO',
  description: '2개 구매 시 1개 무료 쿠폰',
  discountType: 'buyXgetY',
  buyQuantity: 2,
  getQuantity: 1,
  expirationDate: '2024-04-30',
};

export const freeShippingCoupon: Coupon = {
  id: 3,
  code: 'FREESHIPPING',
  description: '5만원 이상 구매 시 무료 배송 쿠폰',
  discountType: 'freeShipping',
  minimumAmount: 50_000,
  expirationDate: '2024-08-31',
};

export const percentageCoupon: Coupon = {
  id: 4,
  code: 'MIRACLESALE',
  description: '미라클모닝 30% 할인 쿠폰',
  discount: 30,
  discountType: 'percentage',
  availableTime: {
    start: '04:00:00',
    end: '07:00:00',
  },
  expirationDate: '2024-07-31',
};

export const mockCoupons: Coupon[] = [fixedCoupon, bogoCoupon, freeShippingCoupon, percentageCoupon];
