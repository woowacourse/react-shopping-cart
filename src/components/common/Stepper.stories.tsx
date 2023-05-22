import type { Meta, StoryObj } from '@storybook/react';
import Stepper from './Stepper';

const meta = {
  title: 'Stepper',
  component: Stepper,
} satisfies Meta<typeof Stepper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 0,
  },
};
