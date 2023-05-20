import { Meta, StoryObj } from '@storybook/react';

import { fetchCartProducts } from '../apis/cartProducts';
import CartProductList from '../components/Cart/CartProductList';

const meta = {
  title: 'Cart/CartProductList',
  component: CartProductList,
  tags: ['autodocs'],
  argTypes: {},

  render: (args, { loaded: { products } }) => <CartProductList {...products} />,
} satisfies Meta<typeof CartProductList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  loaders: [
    async () => ({
      products: await fetchCartProducts(),
    }),
  ],
};
