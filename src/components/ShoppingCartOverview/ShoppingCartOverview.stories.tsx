import type { Meta, StoryObj } from '@storybook/react';
import ShoppingCartOverview from './ShoppingCartOverview';

const meta = {
  title: 'ShoppingCartOverview',
  component: ShoppingCartOverview,
} satisfies Meta<typeof ShoppingCartOverview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 기본: Story = {};
