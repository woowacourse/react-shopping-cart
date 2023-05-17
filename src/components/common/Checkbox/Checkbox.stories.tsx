import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';

const meta = {
  title: 'common/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    checked: true,
  },
};
