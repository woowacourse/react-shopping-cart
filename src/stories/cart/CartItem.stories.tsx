import { Meta, StoryObj } from '@storybook/react';

import CartItem from '../../components/cart/CartItem/CartItem';

const meta = {
  title: 'ShoppingCart/Cart/CartItem',
  component: CartItem,
  args: {
    id: 1684161725526,
    quantity: 7,
    product: {
      id: 2,
      name: '올인원 세트-물티수저',
      price: 57600,
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/list/dcee7c3b-230f-482b-a549-ee0ee678222e.jpg?h=400&w=400',
    },
  },
} satisfies Meta<typeof CartItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Skeleton: Story = {
  render: () => {
    return <CartItem.Skeleton />;
  },
};
