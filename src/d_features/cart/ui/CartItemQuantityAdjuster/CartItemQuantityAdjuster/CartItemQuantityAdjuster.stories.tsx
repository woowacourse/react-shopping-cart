import { CartItemQuantityAdjuster } from './CartItemQuantityAdjuster';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CartItemQuantityAdjuster> = {
  title: '4. features/cart/CartItemQuantityAdjuster/CartItemQuantityAdjuster',
  component: CartItemQuantityAdjuster,
  args: {
    cartItemId: 1 as CartItemId,
    quantity: 1,
  },
};

export default meta;

type Story = StoryObj<typeof CartItemQuantityAdjuster>;

export const Common: Story = {
  args: {},
};
