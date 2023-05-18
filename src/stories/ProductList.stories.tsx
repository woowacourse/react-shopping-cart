import type { Meta, StoryObj } from '@storybook/react';
import ProductList from '../components/product/ProductList';

const meta = {
  title: 'ShoppingCart/product/ProductList',
  component: ProductList,
  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof ProductList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
