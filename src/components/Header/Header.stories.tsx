import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Header from '.';

/**
 * `Header`은 페이지의 헤더 컴포넌트입니다.
 */
const meta: Meta<typeof Header> = {
  title: 'Header',
  decorators: [
    (storyFn) => (
      <RecoilRoot>
        <BrowserRouter>{storyFn()}</BrowserRouter>
      </RecoilRoot>
    ),
  ],
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const DefaultHeader: Story = {
  args: {},
};
