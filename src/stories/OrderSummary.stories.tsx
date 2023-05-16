import type { Meta, StoryObj } from '@storybook/react';
import { OrderSummary } from '../components/OrderSummary';

const meta = {
  title: 'ShoppingCart/OrderSummary',
  component: OrderSummary,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof OrderSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
