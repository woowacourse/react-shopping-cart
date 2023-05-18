import type { Meta, StoryObj } from '@storybook/react';
import CartPage from '.';

const meta: Meta<typeof CartPage> = {
  title: 'CartPage',
  component: CartPage,
};

export default meta;
type Story = StoryObj<typeof CartPage>;

export const Default: Story = {
  args: {},
};
