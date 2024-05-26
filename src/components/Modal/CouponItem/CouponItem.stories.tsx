import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import CouponItem from './CouponItem';

const meta = {
  title: 'CouponItem',
  component: CouponItem,
  decorators: [
    (Story) => {
      return (
        <RecoilRoot>
          <Story />
        </RecoilRoot>
      );
    },
  ],
} satisfies Meta<typeof CouponItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    coupon: {
      id: 0,
      code: 'FIXED5000',
      description: '5,000원 할인 쿠폰',
      discount: 5000,
      discountType: 'fixed',
      expirationDate: '2023-11-30',
      minimumAmount: 100000,
    },
    isCouponApplicable: true,
  },
};
