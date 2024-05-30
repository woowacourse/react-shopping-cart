import { Button } from './Button';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: '6. shared/Button',
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Common: Story = {
  args: {
    children: 'Button',
  },
};

export const Primary: Story = {
  args: {
    children: 'Button',
    theme: 'primary',
  },
};

export const CommonDisabled: Story = {
  args: {
    children: 'Button',
    disabled: true,
  },
};

export const PrimaryDisabled: Story = {
  args: {
    children: 'Button',
    theme: 'primary',
    disabled: true,
  },
};
