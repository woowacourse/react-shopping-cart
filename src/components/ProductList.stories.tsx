import type { Meta, StoryObj } from '@storybook/react';
import { selector } from 'recoil';
import client from '../api';
import type { Product } from '../type';
import ProductList from './ProductList';

const meta = {
  title: 'ProductList',
  component: ProductList,
} satisfies Meta<typeof ProductList>;

export default meta;

type Story = StoryObj<typeof meta>;

const productsQuery = selector<Product[]>({
  key: `productsQuery`,
  get: async () => {
    const data = await client.get('/products');
    return data;
  },
});

export const Default: Story = {
  args: {
    productsQuery,
  },
};
