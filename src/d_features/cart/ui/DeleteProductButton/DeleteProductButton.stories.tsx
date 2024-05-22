import { DeleteProductButton } from './DeleteProductButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DeleteProductButton> = {
  title: 'features/cart/DeleteProductButton',
  component: DeleteProductButton,
};

export default meta;

type Story = StoryObj<typeof DeleteProductButton>;

export const Common: Story = {};
