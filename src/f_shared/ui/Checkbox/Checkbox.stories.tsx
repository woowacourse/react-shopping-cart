import { Checkbox } from './Checkbox';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Checkbox> = {
  title: '6. shared/Checkbox',
  component: Checkbox,
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {};
export const Checked: Story = {
  args: {
    checked: true,
  },
};
