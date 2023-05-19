import { Meta, StoryObj } from '@storybook/react';
import { Cart } from 'types';
import CartItem from '.';

const cartItem = {
  component: CartItem,
  title: 'Cart/CartItem',
  tags: ['autodocs'],
} satisfies Meta<typeof CartItem>;

export default cartItem;

type Story = StoryObj<typeof cartItem>;

const mock: Cart = {
  id: 1,
  quantity: 2,
  product: {
    id: 1,
    price: 8000,
    name: '춘식이 아이템',
    imageUrl:
      'https://pbs.twimg.com/profile_images/1641252178450083841/Cn2MUfHG_400x400.jpg',
  },
};

export const Default: Story = {
  args: {
    cartItem: mock,
  },
};
