import type { Meta, StoryObj } from '@storybook/react';

import UserSummaryShoppingCart from '.';

/**
 * `UserSummaryShoppingCart`은 사용자의 장바구니 내 물품종류의 수량을 나타내는 컴포넌트입니다.
 */
const meta: Meta<typeof UserSummaryShoppingCart> = {
  title: 'UserSummaryShoppingCart',
  component: UserSummaryShoppingCart,
  decorators: [
    (storyFn) => (
      <div
        style={{
          backgroundColor: '#333333',
          width: '300px',
          height: '50px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {storyFn()}
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof UserSummaryShoppingCart>;

export const DefaultUserSummaryShoppingCart: Story = {
  args: {
    quantity: 3,
  },
};

/**
 * 로그인이 된 이후의 모습을 나타낸 스토리입니다.
 */
export const LoginUserSummaryShoppingCart: Story = {
  args: {
    username: '다크론',
    quantity: 3,
  },
};

/**
 * 장바구니에 담긴 물품이 없을 때의 스토리입니다.
 */
export const ZeroSummaryShoppingCart: Story = {
  args: {
    quantity: 0,
  },
};

/**
 * 장바구니에 담긴 물품이 99개의를 초과했을 때의 스토리입니다.
 */
export const AboveTheUpperLimitSummaryShoppingCart: Story = {
  args: {
    quantity: 100,
  },
};
