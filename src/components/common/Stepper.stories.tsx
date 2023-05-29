import type { Meta, StoryObj } from '@storybook/react';
import Stepper from './Stepper';

const meta = {
  title: 'common/Stepper',
  component: Stepper,
} satisfies Meta<typeof Stepper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    value: 12,
    variant: 'small',
  },
};

export const Large: Story = {
  args: {
    value: 24,
    variant: 'large',
  },
};
