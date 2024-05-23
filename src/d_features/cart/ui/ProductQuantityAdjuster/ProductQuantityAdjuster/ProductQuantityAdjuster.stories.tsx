import { ProductId } from '@/e_entities/product';

import { ProductQuantityAdjuster } from './ProductQuantityAdjuster';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProductQuantityAdjuster> = {
  title: 'features/cart/ProductQuantityAdjuster/ProductQuantityAdjuster',
  component: ProductQuantityAdjuster,
  args: {
    productId: 1 as ProductId,
    quantity: 1,
  },
};

export default meta;

type Story = StoryObj<typeof ProductQuantityAdjuster>;

export const Common: Story = {
  args: {},
};
