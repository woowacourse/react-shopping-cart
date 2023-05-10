import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot, useRecoilValue } from 'recoil';

import ProductList from './ProductList';
import { cartLengthSelector } from '../../recoil/myCartState';

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

const Wrapper = () => {
  const cartLength = useRecoilValue(cartLengthSelector);

  return (
    <>
      <h1>{cartLength}</h1>
      <ProductList />
    </>
  );
};

export const ShowCartLength: Story = {
  render: Wrapper,
};
