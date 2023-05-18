import type { Meta, StoryObj } from '@storybook/react';
import CartList from './CartList';

const meta = {
  title: 'CartList',
  component: CartList,
  tags: ['autodocs'],
} satisfies Meta<typeof CartList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checkedList: [],
  },
};
