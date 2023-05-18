import { Meta, StoryObj } from '@storybook/react';

import Button from '../components/Common/Button';

const meta = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Button' },
};
