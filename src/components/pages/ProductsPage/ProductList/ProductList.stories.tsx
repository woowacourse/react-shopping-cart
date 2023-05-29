import type { Meta, StoryObj } from '@storybook/react';

import ProductList from '@components/pages/ProductsPage/ProductList/ProductList';

/**
 * 상품 목록 컴포넌트
 */

const meta: Meta<typeof ProductList> = {
  title: 'ProductList',
  component: ProductList,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ProductList>;

export const Default: Story = {};
