import type { Meta, StoryObj } from '@storybook/react';

import catImage from '@public/cat0.png';

import CartItem from '@components/pages/CartListSection/CartList/CartItem/CartItem';

/**
 * 장바구니 아이템
 */

const meta: Meta<typeof CartItem> = {
  title: 'CartItem',
  component: CartItem,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CartItem>;

export const Default: Story = {
  // args: {
  //   product: {
  //     id: 1,
  //     name: '귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이귀여운 고양이',
  //     price: 1000,
  //     imageUrl: catImage,
  //   },
  // },
};
