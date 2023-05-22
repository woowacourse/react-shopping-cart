import { Meta, StoryObj } from '@storybook/react';

import CartProductList from '../components/Cart/CartProductList';

import cartProductApis from '../apis/cartProducts';

const meta = {
  title: 'Cart/CartProductList',
  component: CartProductList,
  tags: ['autodocs'],
  render: (args, { loaded: { products } }) => <CartProductList {...products} />,
} satisfies Meta<typeof CartProductList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  loaders: [
    async () => ({
      products: await cartProductApis.get(),
    }),
  ],
};
