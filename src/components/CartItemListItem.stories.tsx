import type { Meta, StoryObj } from '@storybook/react';
import CartItemListItem from './CartItemListItem';

const meta = {
  title: 'CartItemListItem',
  component: CartItemListItem,
} satisfies Meta<typeof CartItemListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: {
      id: 1,
      imageUrl: 'images/example.jpg',
      name: 'ASUS Vivobook Pro 16x',
      price: 1299000,
    },
    quantity: 1,
  },
};
