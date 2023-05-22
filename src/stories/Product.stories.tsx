import type { Meta, StoryObj } from '@storybook/react';
import { Product } from '../components/Product';

const meta = {
  title: 'ShoppingCart/Product',
  component: Product,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Product>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: {
      id: 1,
      name: '지구',
      price: 1000,
      imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/28/earth-11009__480.jpg',
    },
  },
};
