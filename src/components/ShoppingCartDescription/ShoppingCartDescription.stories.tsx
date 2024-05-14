import type { Meta, StoryObj } from '@storybook/react';
import ShoppingCartDescription from './ShoppingCartDescription';

const meta = {
  title: 'ShoppingCartDescription',
  component: ShoppingCartDescription,
} satisfies Meta<typeof ShoppingCartDescription>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ShoppingCart: Story = {
  args: {
    kindCount: 1,
  },
};
