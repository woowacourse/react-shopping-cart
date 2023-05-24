import type { Meta, StoryObj } from '@storybook/react';
import CartListSection from './CartListSection';

const meta = {
  title: 'CartList/CartListSection',
  component: CartListSection,
  tags: ['autodocs'],
} satisfies Meta<typeof CartListSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CheckIsSameTotalPrice: Story = {};
