import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from '../components/utils/Checkbox/Checkbox';

const meta = {
  title: 'ShoppingCart/Checkbox',
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: true,
    clickEvent: () => {},
  },
};
