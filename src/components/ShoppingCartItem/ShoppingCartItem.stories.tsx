import type { Meta, StoryObj } from '@storybook/react';
import ShoppingCartItem from './ShoppingCartItem';

const meta = {
  title: 'ShoppingCartItem',
  component: ShoppingCartItem,
} satisfies Meta<typeof ShoppingCartItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ShoppingCart: Story = {};
