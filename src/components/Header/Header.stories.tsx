import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import ResetStyle from '@Styles/GlobalStyle';

import Header from '.';

/**
 * `Header`은 페이지의 헤더 컴포넌트입니다.
 *
 * 가로의 최대 너비가 고정되어 있으므로 창을 넓혀 보시는 것을 권장합니다.
 */
const meta: Meta<typeof Header> = {
  title: 'Header',
  decorators: [
    (storyFn) => (
      <BrowserRouter>
        <ResetStyle />
        <RecoilRoot>{storyFn()}</RecoilRoot>
      </BrowserRouter>
    ),
  ],
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const DefaultHeader: Story = {};
