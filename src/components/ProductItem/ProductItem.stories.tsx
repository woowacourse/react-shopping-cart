import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import ProductItem from './ProductItem';

/**
 * 상품 1개 컴포넌트
 */

const meta: Meta<typeof ProductItem> = {
  title: 'ProductItem',
  component: ProductItem,
  tags: ['autodocs'],

  decorators: [
    Story => (
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ProductItem>;

export const Default: Story = {
  args: {
    product: {
      id: 1,
      name: '1',
      price: 1,
      imageUrl: 'https://images.unsplash.com/photo-1507477338202-487281e6c27e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
  },
};
