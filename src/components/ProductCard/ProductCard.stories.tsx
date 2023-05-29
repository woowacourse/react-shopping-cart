import type { Meta, StoryObj } from '@storybook/react';
import ProductCard from './ProductCard';

const meta: Meta<typeof ProductCard> = {
  title: 'ProductCard',
  component: ProductCard,
};

export default meta;

type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    id: 1,
    name: 'SPRAYCAN TEE',
    price: 68000,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0099/5708/1143/products/1904905_BLAC_2.jpg?v=1683635495',
  },
};
