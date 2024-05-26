import type { Meta } from '@storybook/react';

import { MutableSnapshot, RecoilRoot, atom } from 'recoil';
import { Coupon } from '../../../types/coupon';
import CouponModal from './CouponModal';

const initialCoupons: Coupon[] = [
  {
    id: 1,
    code: 'FIXED5000',
    description: '5,000원 할인 쿠폰',
    discount: 5000,
    discountType: 'fixed',
    expirationDate: '2023-11-30',
    minimumAmount: 100000,
  },
  {
    id: 2,
    code: 'BOGO',
    description: '2개 구매 시 1개 무료 쿠폰',
    discountType: 'buyXgetY',
    buyQuantity: 2,
    getQuantity: 1,
    expirationDate: '2024-05-30',
  },
  {
    id: 3,
    code: 'FREESHIPPING',
    description: '5만원 이상 구매 시 무료 배송 쿠폰',
    discountType: 'freeShipping',
    expirationDate: '2024-08-31',
    minimumAmount: 50000,
  },
  {
    id: 4,
    code: 'MIRACLESALE',
    description: '미라클모닝 30% 할인 쿠폰',
    discountType: 'percentage',
    discount: 30,
    expirationDate: '2024-07-31',
    availableTime: { end: '07:00:00', start: '04:00:00' },
  },
];

const couponList = atom<Coupon[]>({
  key: 'couponList',
  default: initialCoupons,
});

const initializeState = ({ set }: MutableSnapshot) => {
  set(couponList, initialCoupons);
};

export default {
  title: 'CouponModal',
  component: CouponModal,
  decorators: [
    (Story) => (
      <RecoilRoot initializeState={initializeState}>
        <Story />
      </RecoilRoot>
    ),
  ],
} as Meta;

export const Default = () => <CouponModal />;
