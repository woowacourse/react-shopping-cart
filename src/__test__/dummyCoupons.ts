import {
  BuyXGetYCoupon,
  FixedDiscountCoupon,
  FreeShippingCoupon,
  PercentageDiscountCoupon,
} from '../type';

export const DUMMY_FIXED_DISCOUNT_COUPON: FixedDiscountCoupon = {
  id: 6,
  code: 'WELCOMEBACK',
  description: '재방문 고객 대상 10,000원 할인 쿠폰',
  discount: 10000,
  discountType: 'fixed',
  minimumAmount: 10000,
  expirationDate: '2024-12-31',
};

export const DUMMY_BUY_X_GET_Y_COUPON: BuyXGetYCoupon = {
  id: 7,
  code: 'BUY3GET2',
  description: '3개 구매 시 2개 무료 쿠폰',
  discountType: 'buyXgetY',
  buyQuantity: 3,
  getQuantity: 2,
  expirationDate: '2024-06-30',
};

export const DUMMY_FREE_SHIPPING_DISCOUNT_COUPON: FreeShippingCoupon = {
  id: 8,
  code: 'NEWYEARFREESHIP',
  description: '신년맞이 무료 배송 쿠폰',
  discountType: 'freeShipping',
  minimumAmount: 30000,
  expirationDate: '2025-01-31',
};

export const DUMMY_PERCENTAGE_DISCOUNT_COUPON: PercentageDiscountCoupon = {
  id: 14,
  code: 'BLACKFRIDAY50',
  description: '블랙프라이데이 50% 할인 쿠폰',
  discount: 50,
  discountType: 'percentage',
  availableTime: {
    start: '15:00:00',
    end: '16:59:59',
  },
  expirationDate: '2024-11-29',
};
