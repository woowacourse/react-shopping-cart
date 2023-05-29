import type { Meta, StoryObj } from '@storybook/react';
import CartProductSummary from './CartProductSummary.tsx';

const meta: Meta<typeof CartProductSummary> = {
  title: 'CartProductSummary',
  component: CartProductSummary,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
