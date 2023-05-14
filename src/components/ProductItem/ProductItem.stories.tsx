import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { RecoilRoot } from 'recoil';

import ProductItem from '.';

/**
 * `ProductItem`은 하나의 쇼핑 품목을 나타내는 컴포넌트입니다.
 */
const meta: Meta<typeof ProductItem> = {
  title: 'ProductItem',
  decorators: [(storyFn) => <RecoilRoot>{storyFn()}</RecoilRoot>],
  component: ProductItem,
};

export default meta;

type Story = StoryObj<typeof ProductItem>;

/**
 * 상품의 기본 스토리입니다.
 */
export const DefaultProductItem: Story = {
  args: {
    product: {
      id: 1,
      price: 20000,
      name: '[밀키트 SET] 아메리칸식 디너',
      imageUrl:
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    },
    width: '280px',
  },
};

/**
 * 상품의 이름이 긴 경우의 스토리입니다.
 */
export const LongNameProductItem: Story = {
  args: {
    product: {
      id: 1,
      price: 20000,
      name: '[건강식] 산뜻한 채소가 가득한 우리 아이 건강 간식',
      imageUrl:
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    },
    width: '280px',
  },
};

/**
 * 상품이 로딩 될 때 나타나는 스켈레톤 스토리입니다.
 */
export const SkeletonProductItem: Story = {
  args: {
    isLoading: true,
    width: '280px',
  },
};

/**
 * 상품의 카트 이미지를 누르면 구매 수량이 1이 되는 인터렉션 스토리입니다.
 */
export const InteractionProductItem: Story = {
  args: {
    product: {
      id: 1,
      price: 20000,
      name: '[밀키트 SET] 아메리칸식 디너',
      imageUrl:
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    },
    width: '280px',
  },
};

InteractionProductItem.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const shoppingCartIcon = canvas.getByTestId('shopping-cart-icon');

  setTimeout(() => {
    shoppingCartIcon.click();
  }, 1000);
};
