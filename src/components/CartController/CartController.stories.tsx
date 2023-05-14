import type { Meta, StoryObj } from '@storybook/react';
import CartController from './CartController';

const meta = {
  component: CartController,
  title: 'CartController',
} satisfies Meta<typeof CartController>;

export default meta;

type Story = StoryObj<typeof meta>;

export const QuantityZero = {
  args: {
    product: {
      id: 1,
      name: '귀여운 고양이',
      price: 100000000,
      imageUrl: 'https://placekitten.com/300/300',
    },
  },
} satisfies Story;
