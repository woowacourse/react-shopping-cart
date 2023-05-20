import { Meta, StoryObj } from '@storybook/react';

import Toast from '../../components/common/Toast/Toast';

const meta = {
  title: 'ShoppingCart/Common/Toast',
  component: Toast,
  argTypes: {
    status: {
      control: { type: 'radio' },
      options: ['success', 'error'],
    },
  },
  args: {
    status: 'success',
    children: 'Message',
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {};

export const Error: Story = {
  args: {
    status: 'error',
  },
};
