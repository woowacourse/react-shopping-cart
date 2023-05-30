import React, { Suspense } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ProductList from './ProductList';
import ProductListFallback from './ProductListFallback';

const meta: Meta<typeof ProductList> = {
  title: 'product/ProductList',
  component: ProductList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Suspense fallback={<ProductListFallback />}>
        <Story />
      </Suspense>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
