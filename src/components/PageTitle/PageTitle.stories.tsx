import type { Meta, StoryObj } from '@storybook/react';

import PageTitle from '.';

/**
 * `PageTitle`은 페이지 내 제목을 보여주는 컴포넌트입니다.
 */
const meta: Meta<typeof PageTitle> = {
  title: 'PageTitle',
  component: PageTitle,
};

export default meta;

type Story = StoryObj<typeof PageTitle>;

/**
 * 기본 스토리입니다.
 */
export const DefaultPageTitle: Story = {
  args: {
    children: '장바구니',
  },
};
