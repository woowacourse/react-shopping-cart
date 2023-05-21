import { Meta, StoryObj } from '@storybook/react';
import Spinner from '.';

const spinner = {
  component: Spinner,
  title: 'Common/Spinner',
  tags: ['autodocs'],
  args: {
    count: 0,
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof Spinner>;

export default spinner;

type Story = StoryObj<typeof spinner>;

export const Default: Story = {};
