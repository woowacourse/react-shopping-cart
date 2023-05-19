import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Header from '@Components/Header';

import GlobalStyle, { CommonPageStyle } from '@Styles/GlobalStyle';

import ProductListPage from '.';

/**
 * `ProductListPage`은 상품의 페이지를 나타내는 페이지 컴포넌트입니다.
 */
const meta: Meta<typeof ProductListPage> = {
  title: 'ProductListPage',
  decorators: [
    (storyFn) => (
      <BrowserRouter>
        <RecoilRoot>
          <GlobalStyle />
          <Header />
          <CommonPageStyle>{storyFn()}</CommonPageStyle>
        </RecoilRoot>
      </BrowserRouter>
    ),
  ],
  component: ProductListPage,
};

export default meta;

type Story = StoryObj<typeof ProductListPage>;

export const DefaultProductList: Story = {};
