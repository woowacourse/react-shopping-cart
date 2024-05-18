import type { Meta, StoryObj } from '@storybook/react';
import CartItemEmptyFallback from './CartItemEmptyFallback';

const meta = {
  title: 'CartItemEmptyFallback',
  component: CartItemEmptyFallback,
} satisfies Meta<typeof CartItemEmptyFallback>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 기본: Story = {};
