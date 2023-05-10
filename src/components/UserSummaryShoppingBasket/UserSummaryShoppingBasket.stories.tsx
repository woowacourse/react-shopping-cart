import type { Meta, StoryObj } from '@storybook/react';

import UserSummaryShoppingBasket from '.';

/**
 * `UserSummaryShoppingBasket`은 사용자의 장바구니 내 물품종류의 수량을 나타내는 컴포넌트입니다.
 *
 * 기본 색상이 white이므로 Dark 모드로 변경하여 해당 스토리를 보시는 것을 추천합니다.
 */
const meta: Meta<typeof UserSummaryShoppingBasket> = {
  title: 'UserSummaryShoppingBasket',
  component: UserSummaryShoppingBasket,
};

export default meta;

type Story = StoryObj<typeof UserSummaryShoppingBasket>;

export const DefaultUserSummaryShoppingBasket: Story = {
  args: {
    quantity: 3,
  },
};

/**
 * 로그인이 된 이후의 모습을 나타낸 스토리입니다.
 */
export const LoginUserSummaryShoppingBasket: Story = {
  args: {
    username: '다크론',
    quantity: 3,
  },
};

/**
 * 장바구니에 담긴 물품이 없을 때의 스토리입니다.
 */
export const ZeroSummaryShoppingBasket: Story = {
  args: {
    quantity: 0,
  },
};

/**
 * 장바구니에 담긴 물품이 99개의를 초과했을 때의 스토리입니다.
 */
export const AboveTheUpperLimitSummaryShoppingBasket: Story = {
  args: {
    quantity: 100,
  },
};
