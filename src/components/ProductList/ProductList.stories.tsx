import type { Meta, StoryObj } from '@storybook/react';
import ProductList from './ProductList';

const meta = {
  title: 'ProductList',
  component: ProductList,
} satisfies Meta<typeof ProductList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
