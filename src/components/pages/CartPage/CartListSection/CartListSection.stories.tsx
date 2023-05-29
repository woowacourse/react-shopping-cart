import type { Meta, StoryObj } from '@storybook/react';
import CartListSection from '@components/pages/CartPage/CartListSection/CartListSection';

/**
 * 장바구니 목록
 */

const meta: Meta<typeof CartListSection> = {
  title: 'CartListSection',
  component: CartListSection,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CartListSection>;

export const Default: Story = {};
