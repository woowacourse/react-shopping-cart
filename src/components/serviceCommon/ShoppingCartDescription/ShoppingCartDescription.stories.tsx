import type { Meta, StoryObj } from '@storybook/react';
import ShoppingCartDescription from './ShoppingCartDescription';

const meta = {
  title: 'ShoppingCartDescription',
  component: ShoppingCartDescription,
} satisfies Meta<typeof ShoppingCartDescription>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 기본: Story = {
  args: {
    kindCount: 1,
  },
};

export const 장바구니가_비었을_때: Story = {
  args: {
    kindCount: 0,
  },
};
