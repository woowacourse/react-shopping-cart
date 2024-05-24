import { CartItem } from '@type/cartItem';

export const mockCartItems: CartItem[] = [
  {
    id: 1,
    quantity: 2,
    product: {
      id: 1,
      name: '춘식이',
      price: 15000,
      imageUrl:
        'https://t1.kakaocdn.net/together_action_prod/admin/20230730/b8d3ba0648d64f5c8564b2e7e908a171',
      category: '고양이',
    },
  },
  {
    id: 2,
    quantity: 1,
    product: {
      id: 2,
      name: '춘배',
      price: 20000,
      imageUrl:
        'https://t1.kakaocdn.net/together_action_prod/admin/20230730/b8d3ba0648d64f5c8564b2e7e908a171',
      category: '고양이',
    },
  },
];

export const mockCartItemsOverTenThousands: CartItem[] = [
  {
    id: 1,
    quantity: 2,
    product: {
      id: 1,
      name: '춘식이',
      price: 15000,
      imageUrl:
        'https://t1.kakaocdn.net/together_action_prod/admin/20230730/b8d3ba0648d64f5c8564b2e7e908a171',
      category: '고양이',
    },
  },
  {
    id: 2,
    quantity: 3,
    product: {
      id: 2,
      name: '춘배',
      price: 30000,
      imageUrl:
        'https://t1.kakaocdn.net/together_action_prod/admin/20230730/b8d3ba0648d64f5c8564b2e7e908a171',
      category: '고양이',
    },
  },
];
