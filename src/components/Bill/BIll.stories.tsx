import type { Meta, StoryObj } from '@storybook/react';
import Bill from './Bill';

const meta: Meta<typeof Bill> = {
  title: 'Bill',
  component: Bill,
};

export default meta;

type Story = StoryObj<typeof Bill>;

export const Default: Story = {
  args: {},
};
