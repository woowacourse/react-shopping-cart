import type { Meta, StoryObj } from '@storybook/react';
import ProductItem from './ProductItem';

const meta = {
  component: ProductItem,
  title: 'ProductItem',
} satisfies Meta<typeof ProductItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    name: '고양이',
    price: 100000000,
    imageUrl: 'https://placekitten.com/300/300',
  },
} satisfies Story;
