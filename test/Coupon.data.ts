import { Coupon } from '@/features/Coupon/types/Coupon.types';

export const couponsForCombination: Coupon[] = [
  {
    id: 1,
    code: 'COUPON1',
    description: '10,000원 할인',
    discountType: 'fixed',
    discount: 10000,
    expirationDate: '2025-12-31',
    checked: false,
    disabled: false,
  },
  {
    id: 2,
    code: 'COUPON2',
    description: '무료 배송 쿠폰',
    discountType: 'freeShipping',
    minimumAmount: 50000,
    expirationDate: '2025-12-31',
    checked: false,
    disabled: false,
  },
  {
    id: 3,
    code: 'COUPON3',
    description: '30% 할인 쿠폰',
    discountType: 'percentage',
    discount: 30,
    expirationDate: '2025-12-31',
    checked: false,
    disabled: false,
  },
];
