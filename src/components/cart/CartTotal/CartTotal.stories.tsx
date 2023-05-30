import type { Meta, StoryObj } from '@storybook/react';
import CartTotal from './CartTotal';

const meta = {
  title: 'cart/CartTotal',
  component: CartTotal,
  tags: ['autodocs'],
} satisfies Meta<typeof CartTotal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalProductPrice: 10000,
  },
};

export const WithNoPrice: Story = {
  args: {
    totalProductPrice: 0,
  },
};

export const WithFreeShipping: Story = {
  args: {
    totalProductPrice: 30000,
  },
};
