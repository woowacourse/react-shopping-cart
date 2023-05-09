import { Meta, StoryObj } from '@storybook/react';

import ProductList from '../components/Product/ProductList';
import mockData from '../data/products.json';

const meta = {
  title: 'Product/ProductList',
  component: ProductList,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ProductList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    products: mockData,
  },
};
