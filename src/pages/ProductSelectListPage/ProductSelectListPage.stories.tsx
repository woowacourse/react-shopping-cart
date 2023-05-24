import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import ProductSelectListPage from '.';

/**
 * `ProductSelectListPage`은 장바구니 상세 페이지 컴포넌트입니다.
 */
const meta: Meta<typeof ProductSelectListPage> = {
  title: 'ProductSelectListPage',
  decorators: [(storyFn) => <RecoilRoot>{storyFn()}</RecoilRoot>],
  component: ProductSelectListPage,
};

export default meta;

type Story = StoryObj<typeof ProductSelectListPage>;

export const DefaultProductSelectListPage: Story = {};
