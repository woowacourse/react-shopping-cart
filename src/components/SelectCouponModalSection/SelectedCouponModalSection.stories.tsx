import type { Meta, StoryObj } from '@storybook/react';

import SelectCouponModalSection from './SelectCouponModalSection';
import { couponListState } from '../../recoil/coupon/couponListAtom';
import { RecoilRoot } from 'recoil';

const MOCK_DATA: Coupon[] = [
  {
    id: 1,
    code: 'FIXED5000',
    description: '5,000원 할인 쿠폰',
    expirationDate: '2024-11-30',
    discount: 5000,
    minimumAmount: 3,
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

const meta = {
  title: 'Components/SelectCouponModalSection',
  component: SelectCouponModalSection,
  tags: ['autodocs'],
} satisfies Meta<typeof SelectCouponModalSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => {
    return (
      <RecoilRoot
        initializeState={({ set }) => set(couponListState, MOCK_DATA)}
      >
        <SelectCouponModalSection />
      </RecoilRoot>
    );
  },
};
