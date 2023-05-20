import type { Meta, StoryObj } from '@storybook/react';
import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';

import ProductList from './ProductList';

import mockProducts from '../../../../mocks/data/products.json';
import { DataFetcher } from '../../../../utils/fetchData';
import { Product } from '../../../../types/Product';

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
        <Story />
      </RecoilRoot>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ProductList>;

const mockFetcher: DataFetcher<Product[]> = {
  read: () => mockProducts,
};

export const Default: Story = {
  args: { listFetcher: mockFetcher },
};
