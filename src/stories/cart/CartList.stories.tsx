import type { Meta, StoryObj } from '@storybook/react';
import CartList from '../../components/cart/CartList';

const meta = {
  title: 'ShoppingCart/cart/CartList',
  component: CartList,
  tags: ['autodocs'],
} satisfies Meta<typeof CartList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
