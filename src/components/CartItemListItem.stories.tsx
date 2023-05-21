import type { Meta, StoryObj } from '@storybook/react';
import { joinPath } from '../api/utils/http';
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
      imageUrl: joinPath(import.meta.env.BASE_URL, '/images/example.jpg'),
      name: 'ASUS Vivobook Pro 16x',
      price: 1299000,
    },
    quantity: 1,
  },
};
