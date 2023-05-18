import { rest } from 'msw';
import CartProductItemList from '../components/CartProductItemList';
import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof CartProductItemList>;
const meta: Meta<typeof CartProductItemList> = {
  title: 'Cart/CartProductItemList',
  component: CartProductItemList,
};
export default meta;

const product = {
  id: 1,
  name: 'PET보틀-밀크티(370ml)',
  price: 43400,
  imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/2ddb9f04-c15d-4647-b6e7-30afb9e8d072.jpg?h=300&w=300',
};

const cartItems = [
  {
    id: 1,
    quantity: 3,
    product: { ...product },
  },
  {
    id: 2,
    quantity: 2,
    product: { ...product },
  },
  {
    id: 3,
    quantity: 8,
    product: { ...product },
  },
];

const handler = [rest.get('/cart-items', (req, res, ctx) => res(ctx.status(200), ctx.json(cartItems)))];

export const Default: Story = {
  args: {},
  parameters: {
    msw: handler,
  },
};
