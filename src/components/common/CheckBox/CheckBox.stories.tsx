import type { Meta, StoryObj } from '@storybook/react';
import CheckBox from '.';

const meta: Meta<typeof CheckBox> = {
  title: 'CheckBox',
  component: CheckBox,
};

export default meta;
type Story = StoryObj<typeof CheckBox>;

export const Default: Story = {
  args: {
    isChecked: false,
  },
};
