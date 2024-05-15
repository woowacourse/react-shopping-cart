import type { Meta, StoryObj } from '@storybook/react';
import ShoppingCartItem from './ShoppingCartItem';

const meta = {
  title: 'ShoppingCartItem',
  component: ShoppingCartItem,
} satisfies Meta<typeof ShoppingCartItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 쇼핑카트: Story = {
  args: {
    cartItem: {
      id: 1,
      quantity: 2,
      product: {
        id: 1,
        name: '춘식이',
        price: 15000000,
        imageUrl:
          'https://t1.kakaocdn.net/together_action_prod/admin/20230730/b8d3ba0648d64f5c8564b2e7e908a171',
        category: '고양이',
      },
    },
    refetch: async () => console.log('올리'),
    isSelected: () => false,
    onCheckboxClick: () => console.log('쿠키'),
    selectedItemQuantity: () => console.log('춘식이'),
    getOneItemQuantity: () => 1,
    setOneItemQuantity: () => console.log('춘식이'),
  },
};
