import type { Meta, StoryObj } from '@storybook/react';
import ProductItem from './ProductItem';

const meta = {
  title: 'box/ProductItem',
  component: ProductItem,
  tags: ['autodocs'],
} satisfies Meta<typeof ProductItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ProductContent: Story = {
  args: {
    product: {
      id: 1,
      name: '지구',
      price: 1000,
      imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/28/earth-11009__480.jpg',
    },
  },
};
