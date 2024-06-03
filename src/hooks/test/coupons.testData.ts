import { CouponType } from '../../components/type';

export const mockCoupons: CouponType[] = [
  {
    id: 1,
    code: 'FIXED5000',
    description: '5,000원 할인 쿠폰',
    discount: 5000,
    discountType: 'fixed',
    minimumAmount: 100000,
    expirationDate: '2025-11-30',
  },
  {
    id: 2,
    code: 'BOGO',
    description: '2개 구매 시 1개 무료 쿠폰',
    discountType: 'buyXgetY',
    buyQuantity: 2,
    getQuantity: 1,
    expirationDate: '2025-04-30',
  },
  {
    id: 3,
    code: 'FREESHIPPING',
    description: '5만원 이상 구매 시 무료 배송 쿠폰',
    discountType: 'freeShipping',
    minimumAmount: 50000,
    expirationDate: '2025-08-31',
  },
  {
    id: 4,
    code: 'MIRACLESALE',
    description: '미라클모닝 30% 할인 쿠폰',
    discount: 30,
    discountType: 'percentage',
    availableTime: {
      start: '04:00:00',
      end: '07:00:00',
    },
    expirationDate: '2025-07-31',
  },
];

export const fixed1000: CouponType[] = [
  {
    id: 1,
    code: 'FIXED1000',
    description: '1,000원 할인 쿠폰',
    discount: 1000,
    discountType: 'fixed',
    minimumAmount: 100000,
    expirationDate: '2025-11-30',
  },
];

export const buy1get1: CouponType[] = [
  {
    id: 2,
    code: 'BOGO',
    description: '1개 구매 시 1개 무료 쿠폰',
    discountType: 'buyXgetY',
    buyQuantity: 1,
    getQuantity: 1,
    expirationDate: '2025-04-30',
  },
];
export const freeShipping: CouponType[] = [
  {
    id: 3,
    code: 'FREESHIPPING',
    description: '5만원 이상 구매 시 무료 배송 쿠폰',
    discountType: 'freeShipping',
    minimumAmount: 50000,
    expirationDate: '2025-08-31',
  },
];
export const percentageDiscount: CouponType[] = [
  {
    id: 4,
    code: 'PERCENTAGE',
    description: '20% 할인 쿠폰',
    discount: 20,
    discountType: 'percentage',
    expirationDate: '2025-07-31',
  },
];

export const couponPriority: CouponType[] = [
  {
    id: 1,
    code: 'FIXED1000',
    description: '1,000원 할인 쿠폰',
    discount: 1000,
    discountType: 'fixed',
    minimumAmount: 100000,
    expirationDate: '2025-11-30',
  },
  {
    id: 4,
    code: 'PERCENTAGE',
    description: '20% 할인 쿠폰',
    discount: 20,
    discountType: 'percentage',
    expirationDate: '2025-07-31',
  },
];
