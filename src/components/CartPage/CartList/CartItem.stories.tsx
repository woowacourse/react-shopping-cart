import type { Meta, StoryObj } from '@storybook/react';
import { PRODUCT_LIST } from '@mockData/productList';
import CartItem from './CartItem';

const meta: Meta<typeof CartItem> = {
  title: 'CartItem',
  component: CartItem,
};

export default meta;
type Story = StoryObj<typeof CartItem>;

export const Default: Story = {
  args: {
    imageUrl: PRODUCT_LIST.productList[0].imageUrl,
    name: '[든든] 야채바삭 김말이 700g',
    price: 8440,
    quantity: 4,
    id: 2,
  },
};
