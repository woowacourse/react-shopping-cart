import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'btn',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Size_SS: Story = {
  args: {
    size: 'SS',
    view: 'white',
  },
};

export const Size_S: Story = {
  args: {
    size: 'S',
    view: 'white',
  },
};

export const Size_M: Story = {
  args: {
    size: 'M',
    view: 'white',
  },
};

export const Size_L: Story = {
  args: {
    size: 'L',
    view: 'black',
  },
};
