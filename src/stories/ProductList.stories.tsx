import type { Meta, StoryObj } from '@storybook/react';
import { lazy } from 'react';

const ProductList = lazy(() => import('../components/product/ProductList'));

const meta = {
  title: 'ShoppingCart/product/ProductList',
  component: ProductList,
  tags: ['autodocs'],
} satisfies Meta<typeof ProductList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
