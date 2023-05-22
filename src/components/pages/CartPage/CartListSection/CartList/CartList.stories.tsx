import type { Meta, StoryObj } from '@storybook/react';
import CartList from '@components/pages/CartPage/CartListSection/CartList/CartList';

/**
 * 장바구니 목록
 */

const meta: Meta<typeof CartList> = {
  title: 'CartList',
  component: CartList,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CartList>;

export const Default: Story = {};
