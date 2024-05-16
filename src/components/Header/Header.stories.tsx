import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';
import { fn } from '@storybook/test';

const meta = {
  title: 'Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imgType: 'logo',
    onClick: fn(),
  },
};
