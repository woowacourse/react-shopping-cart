import { DeleteCartButton } from './DeleteCartButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DeleteCartButton> = {
  title: '4. features/cart/DeleteCartButton',
  component: DeleteCartButton,
};

export default meta;

type Story = StoryObj<typeof DeleteCartButton>;

export const Common: Story = {};
