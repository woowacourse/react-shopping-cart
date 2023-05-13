import type { Meta, StoryObj } from '@storybook/react';

import Stepper from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Stepper',
  component: Stepper,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  args: {
    productId: 1,
  },
};
