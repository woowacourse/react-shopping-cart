import type { Meta, StoryObj } from '@storybook/react';
import InputStepper from './InputStepper';

const meta = {
  title: 'common/InputStepper',
  component: InputStepper,
  tags: ['autodocs'],
} satisfies Meta<typeof InputStepper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SmallInputStepper: Story = {
  args: {
    size: 'small',
    quantity: 1,
    setQuantity: () => {},
  },
};

export const BigInputStepper: Story = {
  args: {
    size: 'big',
    quantity: 1,
    setQuantity: () => {},
  },
};