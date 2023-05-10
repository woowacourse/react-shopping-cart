import type { Meta, StoryObj } from '@storybook/react';
import ProductItem from './ProductItem';
import ProductList from './ProductList';

const mockProducts = [
  {
    id: 1,
    name: '치킨',
    price: 10000,
    imageUrl: 'http://example.com/chicken.jpg',
  },
  {
    id: 2,
    name: '피자',
    price: 20000,
    imageUrl: 'http://example.com/pizza.jpg',
  },
  {
    id: 3,
    name: '짜장면',
    price: 30000,
    imageUrl: 'http://example.com/pizza.jpg',
  },
  {
    id: 4,
    name: '도넛',
    price: 40000,
    imageUrl: 'http://example.com/pizza.jpg',
  },
  {
    id: 5,
    name: '도넛',
    price: 40000,
    imageUrl: 'http://example.com/pizza.jpg',
  },
];

const meta = {
  title: 'ProductList',
  component: ProductList,
} satisfies Meta<typeof ProductList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: mockProducts.map((product) => <ProductItem product={product} />),
  },
};
