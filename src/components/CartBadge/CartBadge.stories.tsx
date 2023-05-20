import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import styled from 'styled-components';

import CartBadge from '.';

const Layout = styled.div`
  background-color: #333333;
  padding: 20px;
`;

/**
 * `CartBadge`은 사용자의 장바구니 내 물품종류의 수량을 나타내는 컴포넌트입니다.
 */
const meta: Meta<typeof CartBadge> = {
  title: 'CartBadge',
  component: CartBadge,
  decorators: [
    (storyFn) => (
      <RecoilRoot>
        <BrowserRouter>
          <Layout>{storyFn()}</Layout>
        </BrowserRouter>
      </RecoilRoot>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CartBadge>;

export const DefaultCartBadge: Story = {
  args: {
    cartItemsAmount: '3',
  },
};

/**
 * 로그인이 된 이후의 모습을 나타낸 스토리입니다.
 */
export const LoginCartBadge: Story = {
  args: {
    username: '다크론',
    cartItemsAmount: '3',
  },
};

/**
 * 장바구니에 담긴 물품이 없을 때의 스토리입니다.
 */
export const ZeroSummaryCartBadge: Story = {
  args: {
    cartItemsAmount: '0',
  },
};

/**
 * 장바구니에 담긴 물품이 하나일 때의 스토리입니다.
 */
export const OneSummaryCartBadge: Story = {
  args: {
    cartItemsAmount: '1',
  },
};

/**
 * 장바구니에 담긴 물품이 99개의를 초과했을 때의 스토리입니다.
 */
export const AboveTheUpperLimitSummaryCartBadge: Story = {
  args: {
    cartItemsAmount: '99+',
  },
};
