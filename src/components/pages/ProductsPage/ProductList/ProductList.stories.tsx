import type { Meta, StoryObj } from '@storybook/react';
import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';

import ProductList from './ProductList';

import mockProducts from '../../../../mocks/data/products.json';

/**
 * 상품 목록 컴포넌트
 */

const meta: Meta<typeof ProductList> = {
  title: 'ProductList',
  component: ProductList,
  tags: ['autodocs'],

  decorators: [
    (Story) => (
      <RecoilRoot>
        <Suspense fallback={<p>msw에서 데이터 불러오는중..</p>}>
          <Story />
        </Suspense>
      </RecoilRoot>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ProductList>;

export const Default: Story = {
  args: { list: mockProducts },
};
