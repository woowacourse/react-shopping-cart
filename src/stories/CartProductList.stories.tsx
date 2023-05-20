import { Meta, StoryObj } from '@storybook/react';

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

const mockProduct = {
  id: 1,
  quantity: 2,
  product: {
    id: 1,
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
    imageUrl: 'images/정사각-420.jpeg',
  },
};

export const Default: Story = {
  args: {
    cartProduct: mockProduct,
  },
};
