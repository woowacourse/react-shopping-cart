import CartProductItem from '../components/CartProductItem';
import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof CartProductItem>;
const meta: Meta<typeof CartProductItem> = {
  title: 'Cart/CartProductItem',
  component: CartProductItem,
};
export default meta;

const cartItem = {
  id: 1,
  quantity: 2,
  product: {
    id: 1,
    name: 'PET보틀-정사각(420ml)',
    price: 10000,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/2ddb9f04-c15d-4647-b6e7-30afb9e8d072.jpg?h=300&w=300',
  },
};

export const Default: Story = {
  args: {
    cartItem,
  },
};
