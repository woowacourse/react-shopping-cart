import type { Meta, StoryObj } from '@storybook/react';
import Header from '.';
import CartTextButton from '../CartTextButton';

const meta: Meta<typeof Header> = {
  title: 'Header',
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    children: <CartTextButton />,
  },
};
