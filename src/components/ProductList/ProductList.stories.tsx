import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import ProductList from './ProductList';

/**
 * 설명창
 */

const meta: Meta<typeof ProductList> = {
  title: 'ProductList',
  component: ProductList,
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

type Story = StoryObj<typeof ProductList>;

/**
 * 테스트
 */

export const Default: Story = {};
