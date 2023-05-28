import { Meta, StoryObj } from '@storybook/react';

import Checkbox from '../../components/common/Checkbox/Checkbox';

const meta = {
  title: 'ShoppingCart/Common/Checkbox',
  component: Checkbox,
  args: {
    checked: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};

export const Checked: Story = {
  args: {
    checked: true,
  },
};
