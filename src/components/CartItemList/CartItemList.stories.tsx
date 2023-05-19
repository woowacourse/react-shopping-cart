import { Meta, StoryObj } from '@storybook/react';
import CartItemList from '.';

const cartItemList = {
  component: CartItemList,
  title: 'Cart/CartItemList',
  tags: ['autodocs'],
} satisfies Meta<typeof CartItemList>;

export default cartItemList;

type Story = StoryObj<typeof cartItemList>;

export const Default: Story = {};
