import type { Meta, StoryObj } from '@storybook/react';
import CartPage from './CartPage';

const meta = {
  title: 'pages/CartPage',
  component: CartPage,
  tags: ['autodocs'],
} satisfies Meta<typeof CartPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
