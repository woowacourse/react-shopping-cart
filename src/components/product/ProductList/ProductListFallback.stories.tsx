import type { Meta, StoryObj } from '@storybook/react';
import ProductListFallback from './ProductListFallback';

const meta = {
  title: 'product/ProductListFallback',
  component: ProductListFallback,
  tags: ['autodocs'],
} satisfies Meta<typeof ProductListFallback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
