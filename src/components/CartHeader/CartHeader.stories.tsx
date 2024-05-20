import type { Meta, StoryObj } from '@storybook/react';
import CartHeader from './CartHeader';

const meta = {
  title: 'CartHeader',
  component: CartHeader,
} satisfies Meta<typeof CartHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 2,
  },
};
