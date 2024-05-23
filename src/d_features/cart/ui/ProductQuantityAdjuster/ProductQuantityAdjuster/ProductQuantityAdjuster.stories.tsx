import { OrderId } from '@/e_entities/product';

import { ProductQuantityAdjuster } from './ProductQuantityAdjuster';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProductQuantityAdjuster> = {
  title: 'features/cart/ProductQuantityAdjuster/ProductQuantityAdjuster',
  component: ProductQuantityAdjuster,
  args: {
    orderId: 1 as OrderId,
    quantity: 1,
  },
};

export default meta;

type Story = StoryObj<typeof ProductQuantityAdjuster>;

export const Common: Story = {
  args: {},
};
