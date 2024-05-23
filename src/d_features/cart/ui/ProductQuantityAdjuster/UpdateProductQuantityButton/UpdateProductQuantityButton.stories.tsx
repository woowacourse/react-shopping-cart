import { OrderId } from '@/e_entities/product';

import { UpdateProductQuantityButton } from './UpdateProductQuantityButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof UpdateProductQuantityButton> = {
  title: 'features/cart/ProductQuantityAdjuster/UpdateProductQuantityButton',
  component: UpdateProductQuantityButton,
  args: {
    orderId: 1 as OrderId,
  },
};

export default meta;

type Story = StoryObj<typeof UpdateProductQuantityButton>;

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
