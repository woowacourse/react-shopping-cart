import type { Meta, StoryObj } from '@storybook/react';
import CartPage from '.';

const meta: Meta<typeof CartPage> = {
  title: 'page',
  component: CartPage,
};

export default meta;
type Story = StoryObj<typeof CartPage>;

export const Cart: Story = {
  args: {},
};
