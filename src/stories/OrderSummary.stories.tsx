import type { Meta, StoryObj } from '@storybook/react';
import { OrderSummary } from '../components/OrderSummary';
import { customViewPorts } from '../../.storybook/preview';

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

export const Default: Story = {
  args: {
    totalProductPrice: 2000,
  },
};

export const Mobile: Story = {
  args: {
    totalProductPrice: 2000,
  },
  parameters: {
    viewport: {
      Default: customViewPorts.Mobile,
      defaultViewport: 'Mobile',
    },
  },
};
