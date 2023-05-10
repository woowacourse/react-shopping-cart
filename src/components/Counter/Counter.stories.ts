import type { Meta, StoryObj } from '@storybook/react';
import Counter from './Counter';

const meta = {
  title: 'Counter',
  component: Counter,
  tags: ['autodocs'],
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Medium: Story = {
  args: {
    count: 1,
  },
};

export const Small: Story = {
  args: {
    count: 1,
    size: 'small',
  },
};
