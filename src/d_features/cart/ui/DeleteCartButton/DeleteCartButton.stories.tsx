import { DeleteCartButton } from './DeleteCartButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DeleteCartButton> = {
  title: 'features/cart/DeleteCartButton',
  component: DeleteCartButton,
};

export default meta;

type Story = StoryObj<typeof DeleteCartButton>;

export const Common: Story = {};
