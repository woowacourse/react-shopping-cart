import type { Meta, StoryObj } from '@storybook/react';
import CountButton from './CountButton';

const meta = {
  title: 'CountButton',
  component: CountButton,
} satisfies Meta<typeof CountButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MinusButton: Story = {
  args: {
    type: 'minus',
    onClick: () => {},
  },
};

export const PlusButton: Story = {
  args: {
    type: 'plus',
    onClick: () => {},
  },
};
