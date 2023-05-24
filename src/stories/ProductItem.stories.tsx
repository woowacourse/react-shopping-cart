import { Meta, StoryObj } from '@storybook/react';

import ProductItem from '../components/Product/ProductItem';

const meta = {
  title: 'Product/ProductItem',
  component: ProductItem,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ProductItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockProduct = {
  id: 1,
  name: 'PET보틀-정사각(420ml)',
  price: 43400,
  imageUrl: 'images/정사각-420.jpeg',
};

export const Default: Story = {
  args: {
    product: mockProduct,
  },
};
