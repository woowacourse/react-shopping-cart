import { CheckCartButton } from './CheckCartButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CheckCartButton> = {
  title: '4. features/cart/CheckCartButton',
  component: CheckCartButton,
};

export default meta;

type Story = StoryObj<typeof CheckCartButton>;

export const Common: Story = {};
