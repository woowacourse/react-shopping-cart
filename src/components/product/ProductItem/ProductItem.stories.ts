import type { Meta, StoryObj } from '@storybook/react';
import ProductItem from './ProductItem';

const meta = {
  title: 'product/ProductItem',
  component: ProductItem,
  tags: ['autodocs'],
} satisfies Meta<typeof ProductItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  id: 0,
  name: '순살치킨 1KG',
  price: 9900,
  imageSrc:
    'https://cdn-mart.baemin.com/sellergoods/main/c6f2f083-a8b8-4799-834b-444b5eaeb532.png?h=400&w=400',
};

export const Default: Story = {
  args: { ...defaultArgs },
};
