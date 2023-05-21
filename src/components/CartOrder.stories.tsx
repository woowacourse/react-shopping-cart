import type { Meta, StoryObj } from '@storybook/react';
import CartOrder from './CartOrder';

const meta = {
  title: 'CartOrder',
  component: CartOrder,
} satisfies Meta<typeof CartOrder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isCartEmpty: false,
  },
};

export const CartEmpty: Story = {
  args: {
    isCartEmpty: true,
  },
};
