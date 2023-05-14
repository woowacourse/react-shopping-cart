import type { Meta, StoryObj } from '@storybook/react';
import StepperInput from './StepperInput.tsx';

const meta: Meta<typeof StepperInput> = {
  title: 'StepperInput',
  component: StepperInput,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    min: 0,
    max: 99,
    step: 1,
    initialValue: 0,
    getValue: () => {},
  },
};
