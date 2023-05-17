import type { Meta, StoryObj } from '@storybook/react';
import { ShoppingCart } from '../pages/ShoppingCart';

const meta = {
  title: 'ShoppingCart/ShoppingCart',
  component: ShoppingCart,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ShoppingCart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
