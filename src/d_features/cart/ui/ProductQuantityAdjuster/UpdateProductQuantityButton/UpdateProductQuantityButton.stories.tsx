import { ProductId } from '@/e_entities/product';

import { UpdateProductQuantityButton } from './UpdateProductQuantityButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof UpdateProductQuantityButton> = {
  title: 'features/cart/ProductQuantityAdjuster/UpdateProductQuantityButton',
  component: UpdateProductQuantityButton,
  args: {
    productId: 1 as ProductId,
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
