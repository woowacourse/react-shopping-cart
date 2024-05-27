import { RecoilRoot } from 'recoil';

import { DeleteCartItemButton } from './DeleteCartItemButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DeleteCartItemButton> = {
  title: '4. features/cart/DeleteCartItem',
  component: DeleteCartItemButton,
  decorators: [
    (Story) => (
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof DeleteCartItemButton>;

export const Common: Story = {};
