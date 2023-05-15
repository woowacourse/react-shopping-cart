import type { Meta, StoryObj } from '@storybook/react';
import ProductList from './ProductList';

const meta = {
  title: 'list/ProductList',
  component: ProductList,
  tags: ['autodocs'],
} satisfies Meta<typeof ProductList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ProductListContents: Story = {
  args: {},
};
