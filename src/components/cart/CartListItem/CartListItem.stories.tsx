import type { Meta, StoryObj } from '@storybook/react';
import CartListItem from './CartListItem';

const meta = {
  title: 'cart/CartListItem',
  component: CartListItem,
  tags: ['autodocs'],
} satisfies Meta<typeof CartListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const cartItem = {
  id: '0',
  quantity: 1,
  product: {
    id: 1,
    name: '순살치킨 1KG',
    price: 9900,
    imageSrc:
      'https://cdn-mart.baemin.com/sellergoods/main/c6f2f083-a8b8-4799-834b-444b5eaeb532.png?h=400&w=400',
  },
};

export const Default: Story = {
  args: {
    cartItem,
    checked: true,
  },
};
