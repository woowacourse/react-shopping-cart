import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';

import UserShoppingCartBadgeProps from '.';

const Layout = styled.div`
  background-color: #333333;
  padding: 20px;
`;

/**
 * `UserShoppingCartBadgeProps`은 사용자의 장바구니 내 물품종류의 수량을 나타내는 컴포넌트입니다.
 */
const meta: Meta<typeof UserShoppingCartBadgeProps> = {
  title: 'UserShoppingCartBadgeProps',
  component: UserShoppingCartBadgeProps,
  decorators: [(storyFn) => <Layout>{storyFn()}</Layout>],
};

export default meta;

type Story = StoryObj<typeof UserShoppingCartBadgeProps>;

export const DefaultUserShoppingCartBadgeProps: Story = {
  args: {
    shoppingCartAmount: '3',
  },
};

/**
 * 로그인이 된 이후의 모습을 나타낸 스토리입니다.
 */
export const LoginUserShoppingCartBadgeProps: Story = {
  args: {
    username: '다크론',
    shoppingCartAmount: '3',
  },
};

/**
 * 장바구니에 담긴 물품이 없을 때의 스토리입니다.
 */
export const ZeroSummaryShoppingCart: Story = {
  args: {
    shoppingCartAmount: '0',
  },
};

/**
 * 장바구니에 담긴 물품이 하나일 때의 스토리입니다.
 */
export const OneSummaryShoppingCart: Story = {
  args: {
    shoppingCartAmount: '1',
  },
};

/**
 * 장바구니에 담긴 물품이 99개의를 초과했을 때의 스토리입니다.
 */
export const AboveTheUpperLimitSummaryShoppingCart: Story = {
  args: {
    shoppingCartAmount: '99+',
  },
};
