import type { Meta, StoryObj } from '@storybook/react';
import ProductFallBack from './ProductFallBack';

const meta = {
  title: 'ProductFallBack',
  component: ProductFallBack,
  tags: ['autodocs'],
} satisfies Meta<typeof ProductFallBack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
