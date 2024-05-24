import { type Meta, type StoryObj } from '@storybook/react';
import CouponItem from './CouponItem';
import { RecoilRoot } from 'recoil';

const meta = {
  title: 'Components/CouponItem',
  component: CouponItem,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    description: '5000원 할인 쿠폰',
    expirationDate: '2024-04-30',
    availableTime: {
      start: '04:00:00',
      end: '07:00:00',
    },
    minimumAmount: 50000,
  },
} satisfies Meta<typeof CouponItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return (
      <RecoilRoot>
        <CouponItem {...args} />
      </RecoilRoot>
    );
  },
};

export const Disabled: Story = {
  render: ({ ...args }) => {
    return (
      <RecoilRoot>
        <CouponItem {...args} isApplicable={true} />
      </RecoilRoot>
    );
  },
};
