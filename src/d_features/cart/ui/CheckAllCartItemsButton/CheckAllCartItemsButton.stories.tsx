import { CheckAllCartItemsButton } from './CheckAllCartItemsButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CheckAllCartItemsButton> = {
  title: '4. features/cart/CheckAllCartItemsButton',
  component: CheckAllCartItemsButton,
};

export default meta;

type Story = StoryObj<typeof CheckAllCartItemsButton>;

export const Common: Story = {};
