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
    title: '안녕',
    descriptionShowingCondition: true,
    description: '현재 1종류의 상품이 담겨있습니다.',
  },
};

export const 장바구니가_비었을_때: Story = {
  args: {
    title: '안녕',
    descriptionShowingCondition: false,
    description: '현재 1종류의 상품이 담겨있습니다.',
  },
};
