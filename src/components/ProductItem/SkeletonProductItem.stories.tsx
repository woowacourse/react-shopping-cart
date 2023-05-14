import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import SkeletonProductItem from './Skeleton';

/**
 * `SkeletonProductItem`은 하나의 쇼핑 품목 스켈레톤 컴포넌트입니다.
 *
 * 컴포넌트의 너비가 100%이므로 창의 너비를 좁혀 보시는 것을 권장합니다.
 */
const meta: Meta<typeof SkeletonProductItem> = {
  title: 'SkeletonProductItem',
  decorators: [
    (storyFn) => (
      <RecoilRoot>
        <div style={{ width: '250px' }}>{storyFn()}</div>
      </RecoilRoot>
    ),
  ],
  component: SkeletonProductItem,
};

export default meta;

type Story = StoryObj<typeof SkeletonProductItem>;

/**
 * 상품이 로딩 중일 때 스켈레톤 컴포넌트입니다.
 */
export const LongNameProductItem: Story = {
  args: {
    isLoading: true,
  },
};
