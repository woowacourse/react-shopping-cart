import type { Meta, StoryFn } from '@storybook/react';
import InputStepper from './InputStepper';
import { useState } from 'react';

const meta = {
  title: 'common/InputStepper',
  component: InputStepper,
  tags: ['autodocs'],
} satisfies Meta<typeof InputStepper>;

export default meta;

type Story = StoryFn<typeof meta>;

export const SmallInputStepper: Story = () => {
  const [quantity, setQuantity] = useState(1);
  return (
    <InputStepper
      size="small"
      quantity={quantity}
      setQuantity={(value: number) => setQuantity(value)}
    />
  );
};

export const BigInputStepper: Story = () => {
  const [quantity, setQuantity] = useState(1);
  return (
    <InputStepper
      size="big"
      quantity={quantity}
      setQuantity={(value: number) => setQuantity(value)}
    />
  );
};
