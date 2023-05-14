import type { Meta, StoryObj } from '@storybook/react';
import CartItemList from './CartItemList';

const meta: Meta<typeof CartItemList> = {
  title: 'CartItemList',
  component: CartItemList,
};

export default meta;

type Story = StoryObj<typeof CartItemList>;

export const Default: Story = {
  args: {},
};
