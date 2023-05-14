import type { Meta, StoryObj } from '@storybook/react';
import { useRecoilValue } from 'recoil';

import ProductList from '@components/ProductList/ProductList';
import { cartLengthSelector } from '@recoil/myCartState';

/**
 * 상품 목록 컴포넌트
 */

const meta: Meta<typeof ProductList> = {
  title: 'ProductList',
  component: ProductList,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ProductList>;

/**
 * 기본형
 */

export const Default: Story = {};

/**
 * 왼쪽 상단에 현재 장바구니에 담긴 물건 종류 표시
 */

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
