import { CartId } from '@/e_entities/cart';

import { UpdateCartQuantityButton } from './UpdateCartQuantityButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof UpdateCartQuantityButton> = {
  title: 'features/cart/CartQuantityAdjuster/UpdateCartQuantityButton',
  component: UpdateCartQuantityButton,
  args: {
    cartId: 1 as CartId,
  },
};

export default meta;

type Story = StoryObj<typeof UpdateCartQuantityButton>;

export const Increase: Story = {
  args: {
    type: 'increase',
  },
};
export const Decrease: Story = {
  args: {
    type: 'decrease',
  },
};
