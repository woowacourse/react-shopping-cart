import { UpdateCartItemQuantityButton } from './UpdateCartItemQuantityButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof UpdateCartItemQuantityButton> = {
  title: '4. features/cart/CartItemQuantityAdjuster/UpdateCartItemQuantityButton',
  component: UpdateCartItemQuantityButton,
  args: {
    cartItemId: 1 as CartItemId,
  },
};

export default meta;

type Story = StoryObj<typeof UpdateCartItemQuantityButton>;

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
