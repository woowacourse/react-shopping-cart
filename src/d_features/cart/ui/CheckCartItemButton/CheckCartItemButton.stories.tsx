import { RecoilRoot, useSetRecoilState } from 'recoil';

import { checkedCartItemIdsState } from '@/e_entities/cart';

import { CheckCartItemButton } from './CheckCartItemButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CheckCartItemButton> = {
  title: '4. features/cart/CheckCartItem',
  component: CheckCartItemButton,
  decorators: [
    (Story) => (
      <RecoilRoot>
        <SetCheckedIds />
        <Story />
      </RecoilRoot>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CheckCartItemButton>;

export const Unchecked: Story = {};

export const Checked: Story = {
  args: {
    cartItemId: 1 as CartItemId,
  },
};

const SetCheckedIds = () => {
  const setCheckedIds = useSetRecoilState(checkedCartItemIdsState);
  setCheckedIds([1 as CartItemId]);
  return null;
};
