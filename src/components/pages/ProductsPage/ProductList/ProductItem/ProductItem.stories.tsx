import type { Meta, StoryObj } from '@storybook/react';

import catImage from '@public/cat0.png';

import ProductItem from '@components/pages/ProductsPage/ProductList/ProductItem/ProductItem';

/**
 * 설명창
 */

const meta: Meta<typeof ProductItem> = {
  title: 'ProductItem',
  component: ProductItem,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ProductItem>;

/**
 * 테스트
 */

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
