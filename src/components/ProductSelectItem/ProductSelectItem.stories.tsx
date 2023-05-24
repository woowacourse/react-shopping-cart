import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import ProductSelectItem from '.';

/**
 * `ProductSelectItem`은 하나의 쇼핑 품목을 나타내는 컴포넌트입니다.
 */
const meta: Meta<typeof ProductSelectItem> = {
  title: 'ProductSelectItem',
  decorators: [
    (storyFn) => (
      <RecoilRoot>
        <div style={{ width: '1024px' }}>{storyFn()}</div>
      </RecoilRoot>
    ),
  ],
  component: ProductSelectItem,
};

export default meta;

type Story = StoryObj<typeof ProductSelectItem>;

/**
 * 상품의 기본 스토리입니다.
 */
export const DefaultProductSelectItem: Story = {
  args: {
    product: {
      id: 1,
      price: 20000,
      name: '[밀키트 SET] 아메리칸식 디너',
      imageUrl:
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    },
  },
};

/**
 * 상품의 기본 스토리입니다.
 */
export const LongNameProductSelectItem: Story = {
  args: {
    product: {
      id: 1,
      price: 14000,
      name: '[밀키트 SET] 이름이 매우 매우 매우 매우 매우 매우 매우 매우 매우 매우 긴 아이템도 존재할 것이라고 생각이 들기 때문에 테스트를 해봅니다',
      imageUrl:
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    },
  },
};
