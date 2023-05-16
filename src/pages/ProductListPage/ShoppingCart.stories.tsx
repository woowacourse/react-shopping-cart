import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import Header from '@Components/Header';

import GlobalStyle, { CommonPageStyle } from '@Styles/GlobalStyle';

import ProductList from '.';

/**
 * `ProductList`은 상품의 페이지를 나타내는 페이지 컴포넌트입니다.
 */
const meta: Meta<typeof ProductList> = {
  title: 'ProductList',
  decorators: [
    (storyFn) => (
      <RecoilRoot>
        <GlobalStyle />
        <Header />
        <CommonPageStyle>{storyFn()}</CommonPageStyle>
      </RecoilRoot>
    ),
  ],
  component: ProductList,
};

export default meta;

type Story = StoryObj<typeof ProductList>;

export const DefaultProductList: Story = {};
