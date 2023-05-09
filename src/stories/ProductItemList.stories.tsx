import ProductIteList from '../components/ProductItemList';
import type { Meta, StoryObj } from '@storybook/react';
import { products } from '../data/mockData';

type Story = StoryObj<typeof ProductIteList>;
const meta: Meta<typeof ProductIteList> = {
  title: 'ProductIteList',
  component: ProductIteList,
};
export default meta;

export const Default: Story = {
  args: {
    products,
  },
};
