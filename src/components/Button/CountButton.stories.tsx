import type { Meta, StoryObj } from '@storybook/react';
import CountButton from './CountButton';
import { fn } from '@storybook/test';

const meta = {
  title: 'CountButton',
  component: CountButton,
} satisfies Meta<typeof CountButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MinusButton: Story = {
  args: {
    type: 'minus',
    onClick: fn(),
  },
};

export const PlusButton: Story = {
  args: {
    type: 'plus',
    onClick: fn(),
  },
};
