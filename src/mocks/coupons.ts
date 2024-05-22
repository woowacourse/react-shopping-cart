import { Coupon } from '@/types/coupon';

export const coupons: Coupon[] = [
  {
    id: 1,
    code: 'FIXED5000',
    description: '5,000원 할인 쿠폰',
    expirationDate: '2024-11-30',
    discount: 5000,
    minimumAmount: 100000,
    discountType: 'fixed',
  },
  {
    id: 2,
    code: 'BOGO',
    description: '2개 구매 시 1개 무료 쿠폰',
    expirationDate: '2024-04-30',
    buyQuantity: 2,
    getQuantity: 1,
    discountType: 'buyXgetY',
  },
  {
    id: 3,
    code: 'FREESHIPPING',
    description: '5만원 이상 구매 시 무료 배송 쿠폰',
    expirationDate: '2024-08-31',
    minimumAmount: 50000,
    discountType: 'freeShipping',
  },
  {
    id: 4,
    code: 'MIRACLESALE',
    description: '미라클모닝 30% 할인 쿠폰',
    expirationDate: '2024-07-31',
    discount: 30,
    availableTime: {
      start: '04:00:00',
      end: '07:00:00',
    },
    discountType: 'percentage',
  },
];

export const INVALID_BOGO_COUPON: Coupon = {
  id: 2,
  code: 'BOGO',
  description: '2개 구매 시 1개 무료 쿠폰',
  expirationDate: '2024-04-30',
  buyQuantity: 2,
  getQuantity: 1,
  discountType: 'buyXgetY',
} as const;

export const VALID_FIXED_COUPON: Coupon = {
  id: 1,
  code: 'FIXED5000',
  description: '5,000원 할인 쿠폰',
  expirationDate: '2024-11-30',
  discount: 5000,
  minimumAmount: 100000,
  discountType: 'fixed',
} as const;

export const VALID_PERCENTAGE_COUPON: Coupon = {
  id: 4,
  code: 'MIRACLESALE',
  description: '미라클모닝 30% 할인 쿠폰',
  expirationDate: '2024-07-31',
  discount: 30,
  availableTime: {
    start: '04:00:00',
    end: '07:00:00',
  },
  discountType: 'percentage',
} as const;

export const VALID_FREE_SHIPPING_COUPON: Coupon = {
  id: 3,
  code: 'FREESHIPPING',
  description: '5만원 이상 구매 시 무료 배송 쿠폰',
  expirationDate: '2024-08-31',
  minimumAmount: 50000,
  discountType: 'freeShipping',
} as const;
