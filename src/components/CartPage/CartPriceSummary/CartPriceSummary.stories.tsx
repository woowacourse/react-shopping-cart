import type { Meta, StoryObj } from '@storybook/react';
import CartPriceSummary from './CartPriceSummary.tsx';

const meta: Meta<typeof CartPriceSummary> = {
  title: 'CartPriceSummary',
  component: CartPriceSummary,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
