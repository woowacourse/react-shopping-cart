import type { Meta, StoryObj } from '@storybook/react';
import ProductItemFallback from './ProductItemFallback';

const meta = {
  title: 'product/ProductItemFallback',
  component: ProductItemFallback,
  tags: ['autodocs'],
} satisfies Meta<typeof ProductItemFallback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
