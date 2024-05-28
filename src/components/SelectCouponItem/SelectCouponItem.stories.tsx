import type { Meta, StoryObj } from '@storybook/react';

import SelectCouponItem from './SelectCouponItem';
import { couponListState } from '../../recoil/coupon/atom';
import { RecoilRoot } from 'recoil';

const MOCK_DATA: Coupon = {
  id: 1,
  code: 'FIXED5000',
  description: '5,000원 할인 쿠폰',
  expirationDate: '2024-11-30',
  discount: 5000,
  minimumAmount: 0,
  discountType: 'fixed' as DiscountType,
};

const meta = {
  title: 'Components/SelectCouponItem',
  component: SelectCouponItem,
  tags: ['autodocs'],
  argTypes: {
    coupon: {
      description: '',
      control: { type: 'object' },
    },
  },
  args: { coupon: MOCK_DATA },
} satisfies Meta<typeof SelectCouponItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ coupon }) => {
    return (
      <RecoilRoot initializeState={({ set }) => set(couponListState, [coupon])}>
        <div style={{ width: '430px' }}>
          <SelectCouponItem coupon={MOCK_DATA} />
        </div>
      </RecoilRoot>
    );
  },
};
