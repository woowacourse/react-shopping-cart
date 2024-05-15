import type { Meta, StoryObj } from '@storybook/react';
import ShoppingCartList from './ShoppingCartList';

const meta = {
  title: 'ShoppingCartList',
  component: ShoppingCartList,
} satisfies Meta<typeof ShoppingCartList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 기본: Story = {
  args: {
    cartItems: [],
  },
};
