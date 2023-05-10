import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import catImage from '../../assets/cat.png';

import ProductItem from './ProductItem';

/**
 * 설명창
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

/**
 * 테스트
 */

export const Default: Story = {
  args: {
    product: {
      id: 1,
      name: '1',
      price: 1,
      imageUrl: catImage,
    },
  },
};

export const Clicked: Story = {
  args: {
    product: {
      id: 1,
      name: '1',
      price: 1,
      imageUrl: catImage,
    },
  },
};
