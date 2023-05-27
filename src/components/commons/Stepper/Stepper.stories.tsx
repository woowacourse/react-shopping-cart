import type { Meta, StoryObj } from '@storybook/react';

import Stepper from './Stepper';
import useStepper from '../../../hooks/useStepper';

const meta: Meta<typeof Stepper> = {
  title: 'Stepper',
  component: Stepper,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Stepper>;

const Wrapper = () => {
  const { value, increaseValue, decreaseValue, setValue } = useStepper(0, 99, 1, 0);

  return (
    <Stepper
      value={value}
      increaseValue={increaseValue}
      decreaseValue={decreaseValue}
      setValue={setValue}
    />
  );
};

export const Default: Story = {
  render: () => <Wrapper />,
};
