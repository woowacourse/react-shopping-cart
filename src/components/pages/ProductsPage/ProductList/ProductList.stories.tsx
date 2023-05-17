import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import ProductList from './ProductList';

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

export const Default: Story = {};
