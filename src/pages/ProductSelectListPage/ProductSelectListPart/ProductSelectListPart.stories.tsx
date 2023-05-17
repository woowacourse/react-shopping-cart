import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import ProductSelectListPart from '.';

/**
 * `ProductSelectListPart`은 장바구니 상세 페이지 중 품목을 나타내는 컴포넌트입니다.
 */
const meta: Meta<typeof ProductSelectListPart> = {
  title: 'ProductSelectListPart',
  decorators: [
    (storyFn) => (
      <RecoilRoot>
        <div style={{ width: '900px' }}>{storyFn()}</div>
      </RecoilRoot>
    ),
  ],
  component: ProductSelectListPart,
};

export default meta;

type Story = StoryObj<typeof ProductSelectListPart>;

export const DefaultProductSelectListPart: Story = {
  args: [
    {
      id: 1,
      name: '[간편식] 불고기 도시락',
      price: 10000,
      imageUrl:
        'https://images.unsplash.com/photo-1616645258469-ec681c17f3ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    },
    {
      id: 2,
      name: '[밀키트] 을왕리 부대찌개',
      price: 12000,
      imageUrl:
        'https://images.unsplash.com/photo-1584509171119-9054d2d7d9a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80',
    },
    {
      id: 3,
      name: '[밀키트] 바질 베이스로 만든 에그인헬',
      price: 8000,
      imageUrl:
        'https://images.unsplash.com/photo-1489391013510-49401c8a3b6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    },
  ],
};
