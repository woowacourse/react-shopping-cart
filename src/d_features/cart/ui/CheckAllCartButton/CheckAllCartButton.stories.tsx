import { CheckAllCartButton } from './CheckAllCartButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CheckAllCartButton> = {
  title: '4. features/cart/CheckAllCartButton',
  component: CheckAllCartButton,
};

export default meta;

type Story = StoryObj<typeof CheckAllCartButton>;

export const Common: Story = {};
