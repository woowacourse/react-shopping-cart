import type { Meta, StoryObj } from '@storybook/react';
import ShoppingCartList from './ShoppingCartList';

const meta = {
  title: 'ShoppingCartList',
  component: ShoppingCartList,
} satisfies Meta<typeof ShoppingCartList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 기본: Story = {
  args: {
    cartItems: [
      {
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
      {
        id: 2,
        quantity: 2,
        product: {
          id: 2,
          name: '춘식이2',
          price: 15000000,
          imageUrl:
            'https://t1.kakaocdn.net/together_action_prod/admin/20230730/b8d3ba0648d64f5c8564b2e7e908a171',
          category: '고양이',
        },
      },
      {
        id: 3,
        quantity: 2,
        product: {
          id: 3,
          name: '춘식이3',
          price: 15000000,
          imageUrl:
            'https://t1.kakaocdn.net/together_action_prod/admin/20230730/b8d3ba0648d64f5c8564b2e7e908a171',
          category: '고양이',
        },
      },
    ],
    refetch: async () => console.log('쿠키'),
  },
};
