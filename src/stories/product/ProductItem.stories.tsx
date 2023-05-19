import type { Meta, StoryObj } from '@storybook/react';

import ProductItem from '../../components/product/ProductItem/ProductItem';
import ProductItemSkeleton from '../../components/product/ProductItem/ProductItemSkeleton';

const meta = {
  title: 'ShoppingCart/Product/ProductItem',
  component: ProductItem,
  args: {
    id: 1,
    name: '치킨',
    price: 10000,
    imageUrl: 'https://www.asiaa.co.kr/news/photo/202204/83451_94243_5547.png',
  },
} satisfies Meta<typeof ProductItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Skeleton: Story = {
  render: () => {
    return (
      <div style={{ width: '200px' }}>
        <ProductItemSkeleton />
      </div>
    );
  },
};
