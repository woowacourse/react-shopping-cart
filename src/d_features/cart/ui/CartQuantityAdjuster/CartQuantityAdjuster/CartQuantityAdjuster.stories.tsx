import { CartId } from '@/e_entities/cart';

import { CartQuantityAdjuster } from './CartQuantityAdjuster';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CartQuantityAdjuster> = {
  title: '4. features/cart/CartQuantityAdjuster/CartQuantityAdjuster',
  component: CartQuantityAdjuster,
  args: {
    cartId: 1 as CartId,
    quantity: 1,
  },
};

export default meta;

type Story = StoryObj<typeof CartQuantityAdjuster>;

export const Common: Story = {
  args: {},
};
