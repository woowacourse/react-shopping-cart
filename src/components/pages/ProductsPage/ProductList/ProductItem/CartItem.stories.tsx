import type { Meta, StoryObj } from '@storybook/react';

import catImage from '@public/cat0.png';

import ProductItem from '@components/pages/ProductsPage/ProductList/ProductItem/ProductItem';

/**
 * 장바구니 아이템
 */

const meta: Meta<typeof ProductItem> = {
  title: 'CartProductItem',
  component: ProductItem,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ProductItem>;

export const Default: Story = {
  args: {
    product: {
      id: 1,
      name: '귀여운 고양이',
      price: 1000,
      imageUrl: catImage,
    },
  },
};
