import type { Meta, StoryObj } from '@storybook/react';
import CartItem from './CartItem';

const meta = {
  title: 'Components/CartItem',
  component: CartItem,
  tags: ['autodocs'],
} satisfies Meta<typeof CartItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
