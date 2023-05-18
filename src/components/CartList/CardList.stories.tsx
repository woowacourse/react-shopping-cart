import type { Meta, StoryObj } from '@storybook/react';
import CartList from '.';

const meta: Meta<typeof CartList> = {
  title: 'CartList',
  component: CartList,
};

export default meta;
type Story = StoryObj<typeof CartList>;

export const Default: Story = {
  args: {},
};
