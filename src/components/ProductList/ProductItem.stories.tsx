import type { Meta, StoryObj } from '@storybook/react';
import { PRODUCT_LIST } from 'mockData/productList';
import ProductItem from './ProductItem';

const meta: Meta<typeof ProductItem> = {
  title: 'ProductItem',
  component: ProductItem,
};

export default meta;
type Story = StoryObj<typeof ProductItem>;

export const Default: Story = {
  args: {
    product: {
      id: 1,
      name: '콜라',
      price: 1600,
      imageUrl: PRODUCT_LIST.productList[0].imageUrl,
    },
  },
};
