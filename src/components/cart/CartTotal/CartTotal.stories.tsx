import type { Meta, StoryObj } from '@storybook/react';
import CartTotal from './CartTotal';

const meta = {
  title: 'cart/CartTotal',
  component: CartTotal,
  tags: ['autodocs'],
} satisfies Meta<typeof CartTotal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
