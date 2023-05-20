import { Meta, StoryObj } from '@storybook/react';
import OrderInfo from '.';

const orderInfo = {
  component: OrderInfo,
  title: 'Cart/OrderInfo',
  tags: ['autodocs'],
} satisfies Meta<typeof OrderInfo>;

export default orderInfo;

type Story = StoryObj<typeof orderInfo>;

export const Default: Story = {
  args: {},
};
