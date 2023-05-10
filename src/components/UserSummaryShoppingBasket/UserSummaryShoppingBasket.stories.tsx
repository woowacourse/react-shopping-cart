import type { Meta, StoryObj } from '@storybook/react';

import UserSummaryShoppingBasket from '.';

/**
 * `UserSummaryShoppingBasket`은 사용자의 장바구니 내 물품종류의 수량을 나타내는 컴포넌트입니다.
 */
const meta: Meta<typeof UserSummaryShoppingBasket> = {
  title: 'UserSummaryShoppingBasket',
  component: UserSummaryShoppingBasket,
};

export default meta;

type Story = StoryObj<typeof UserSummaryShoppingBasket>;

export const DefaultUserSummaryShoppingBasket: Story = {};
