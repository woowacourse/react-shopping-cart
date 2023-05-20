import type { Meta, StoryObj } from '@storybook/react';
import TotalPayment from '../../components/cart/TotalPayment';
import { DELIVERY_FEE } from '../../constants';

const meta = {
  title: 'ShoppingCart/cart/TotalPayment',
  component: TotalPayment,
  tags: ['autodocs'],
} satisfies Meta<typeof TotalPayment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalProductsPrice: 999999,
    deliveryFee: DELIVERY_FEE,
  },
};
