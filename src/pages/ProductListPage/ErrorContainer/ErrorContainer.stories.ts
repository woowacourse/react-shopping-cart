import type { Meta, StoryObj } from '@storybook/react';

import { ERROR } from '@Constants/index';

import ErrorContainer from '.';

/**
 * `ErrorContainer`은 상품 목록에 에러가 있는 경우 나타내는 페이지 컴포넌트입니다.
 */
const meta: Meta<typeof ErrorContainer> = {
  title: 'ErrorContainer',

  component: ErrorContainer,
};

export default meta;

type Story = StoryObj<typeof ErrorContainer>;

/**
 * http status가 400번대 오류인 경우의 스토리입니다.
 */
export const HttpClientErrorContainer: Story = {
  args: {
    error: ERROR.httpClient,
  },
};

/**
 * http status가 500번대 오류인 경우의 스토리입니다.
 */
export const HttpServerErrorContainer: Story = {
  args: {
    error: ERROR.httpServer,
  },
};

/**
 * 상품 목록이 없을 경우의 스토리입니다.
 */
export const DataEmptyErrorContainer: Story = {
  args: {
    error: ERROR.dataEmpty,
  },
};
