import type { Meta, StoryObj } from '@storybook/react';
import CartEmptyPlaceholder from './CartEmptyPlaceholder';

const meta = {
  title: 'CartEmptyPlaceholder',
  component: CartEmptyPlaceholder,
} satisfies Meta<typeof CartEmptyPlaceholder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
