import { Coupon } from '@appTypes/orderConfirm';

export const create5000Coupon = (expirationDate = '2024-5-21'): Coupon => ({
  id: 1,
  code: 'FIXED5000',
  description: '5,000원 할인 쿠폰',
  expirationDate,
  discount: 5000,
  minimumAmount: 100000,
  discountType: 'fixed',
});

export const createBOGOCoupon = (expirationDate = '2024-5-21'): Coupon => ({
  id: 2,
  code: 'BOGO',
  description: '2개 구매 시 1개 무료 쿠폰',
  expirationDate,
  buyQuantity: 2,
  getQuantity: 1,
  discountType: 'buyXgetY',
});

export const createFreeShippingCoupon = (expirationDate = '2024-5-21'): Coupon => ({
  id: 3,
  code: 'FREESHIPPING',
  description: '5만원 이상 구매 시 무료 배송 쿠폰',
  expirationDate,
  minimumAmount: 50000,
  discountType: 'freeShipping',
});

export const createMiracleCoupon = (expirationDate = '2024-5-21'): Coupon => ({
  id: 4,
  code: 'MIRACLESALE',
  description: '미라클모닝 30% 할인 쿠폰',
  expirationDate,
  discount: 30,
  availableTime: {
    start: '04:00:00',
    end: '07:00:00',
  },
  discountType: 'percentage',
});
