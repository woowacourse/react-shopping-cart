import { type Meta, type StoryObj } from '@storybook/react';
import CouponItem from './CouponItem';
import { RecoilRoot } from 'recoil';
import { Coupon } from '../../types/coupon.type';
import { mockCouponList } from '../../mocks/couponList';

const meta = {
  title: 'Components/CouponItem',
  component: CouponItem,
  tags: ['autodocs'],
  argTypes: {},
  args: mockCouponList[0],
} satisfies Meta<typeof CouponItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ ...args }: Coupon) => {
    return (
      <RecoilRoot>
        <CouponItem {...args} />
      </RecoilRoot>
    );
  },
};

export const Disabled: Story = {
  render: ({ ...args }: Coupon) => {
    return (
      <RecoilRoot>
        <CouponItem {...args} isApplicable={false} />
      </RecoilRoot>
    );
  },
};
