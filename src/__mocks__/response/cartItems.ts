import { CartItemData } from '@/types';

const MOCK_CART_ITEMS: CartItemData[] = [
  {
    id: 113,
    product: {
      category: 'fashion',
      id: 10,
      imageUrl: 'https://sitem.ssgcdn.com/47/78/22/item/1000031227847_i1_750.jpg',
      name: '퓨마',
      isChecked: false,
      price: 10000,
    },
    quantity: 10,
  },
  {
    id: 1068,
    product: {
      category: 'fashion',
      id: 12,
      imageUrl: 'https://sitem.ssgcdn.com/65/73/69/item/1000163697365_i1_750.jpg',
      name: '컨버스',
      isChecked: false,
      price: 20000,
    },
    quantity: 1,
  },
];

export default MOCK_CART_ITEMS;
