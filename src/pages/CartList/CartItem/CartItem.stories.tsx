import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import CartItem from '.';

/**
 * `CartItem`은 장바구니에 담긴 상품을 나타내는 컴포넌트입니다.
 */
const meta: Meta<typeof CartItem> = {
  title: 'CartItem',
  component: CartItem,
  decorators: [(storyFn) => <RecoilRoot>{storyFn()}</RecoilRoot>],
};

export default meta;

type Story = StoryObj<typeof CartItem>;

export const DefaultCartItem: Story = {
  args: {
    product: {
      id: 1,
      price: 20000,
      name: '[밀키트 SET] 아메리칸식 디너',
      imageUrl:
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    },
    width: '600px',
  },
};

export const SkeletonCartItem: Story = {
  args: {
    width: '600px',
    isLoading: true,
  },
};
