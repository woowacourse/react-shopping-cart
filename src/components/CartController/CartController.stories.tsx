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
    quantity: 0,
  },
} satisfies Story;
