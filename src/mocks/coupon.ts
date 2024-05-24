import { CouponClint } from '@/types/coupon';

export const MOCK_COUPON_CHECK_LIST: CouponClint[] = [
  {
    id: 1,
    code: 'FIXED5000',
    description: '5,000원 할인 쿠폰',
    expirationDate: '2024-11-30',
    discount: 5000,
    minimumAmount: 100000,
    discountType: 'fixed',
    isChecked: false,
  },
  {
    id: 2,
    code: 'BOGO',
    description: '2개 구매 시 1개 무료 쿠폰',
    expirationDate: '2024-06-30',
    buyQuantity: 2,
    getQuantity: 1,
    discountType: 'buyXgetY',
    isChecked: false,
  },
  {
    id: 3,
    code: 'FREESHIPPING',
    description: '5만원 이상 구매 시 무료 배송 쿠폰',
    expirationDate: '2024-08-31',
    minimumAmount: 50000,
    discountType: 'freeShipping',
    isChecked: false,
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
    isChecked: false,
  },
];

export const CHECKED_BOGO_COUPON: CouponClint[] = [
  {
    id: 2,
    code: 'BOGO',
    description: '2개 구매 시 1개 무료 쿠폰',
    expirationDate: '2024-04-30',
    buyQuantity: 2,
    getQuantity: 1,
    discountType: 'buyXgetY',
    isChecked: true,
  },
];

export const CHECKED_FREE_SHIPPING_COUPON: CouponClint[] = [
  {
    id: 3,
    code: 'FREESHIPPING',
    description: '5만원 이상 구매 시 무료 배송 쿠폰',
    expirationDate: '2024-08-31',
    minimumAmount: 50000,
    discountType: 'freeShipping',
    isChecked: true,
  },
];
