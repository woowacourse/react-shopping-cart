// CouponCard.stories.tsx
import { mockCoupons } from '../../../../../mocks/index';

import { CouponCard } from './CouponCard';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CouponCard> = {
  title: '5. entities/order/CouponCard',
  component: CouponCard,
  decorators: [
    (Story) => (
      <div style={{ width: '300px', padding: '10px', border: '1px dashed black' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CouponCard>;

const mockActionSlot = <input type='checkbox' />; // 임시 actionSlot 노드

export const FixedDiscount: Story = {
  args: {
    coupon: mockCoupons[0],
    actionSlot: mockActionSlot,
  },
};

export const BuyXGetY: Story = {
  args: {
    coupon: mockCoupons[1],
    actionSlot: mockActionSlot,
  },
};

export const FreeShipping: Story = {
  args: {
    coupon: mockCoupons[2],
    actionSlot: mockActionSlot,
  },
};

export const PercentageDiscount: Story = {
  args: {
    coupon: mockCoupons[3],
    actionSlot: mockActionSlot,
  },
};
