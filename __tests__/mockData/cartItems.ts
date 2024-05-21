import { CartItem } from '@appTypes/shoppingCart';

export const INITIAL_ITEMS: CartItem[] = [
  {
    id: 106,
    quantity: 3,
    product: {
      id: 2,
      name: '나이키',
      price: 1000,
      imageUrl: '',
      category: 'fashion',
    },
  },
  {
    id: 306,
    quantity: 2,
    product: {
      id: 3,
      name: '아디다스',
      price: 2000,
      imageUrl: '',
      category: 'fashion',
    },
  },
  {
    id: 634,
    quantity: 1,
    product: {
      id: 21,
      name: '아식스',
      price: 20000,
      imageUrl: '',
      category: 'fashion',
    },
  },
];

export const SHIPPING_FREE_ITEMS: CartItem[] = [
  {
    id: 106,
    quantity: 1,
    product: {
      id: 2,
      name: '나이키',
      price: 100000,
      imageUrl: '',
      category: 'fashion',
    },
  },
  {
    id: 306,
    quantity: 1,
    product: {
      id: 3,
      name: '아디다스',
      price: 2000,
      imageUrl: '',
      category: 'fashion',
    },
  },
  {
    id: 634,
    quantity: 1,
    product: {
      id: 21,
      name: '아식스',
      price: 20000,
      imageUrl: '',
      category: 'fashion',
    },
  },
];

export const QUANTITY_TEST_ITEMS: CartItem[] = [
  {
    id: 306,
    quantity: 1,
    product: {
      id: 3,
      name: '아디다스',
      price: 2000,
      imageUrl: '',
      category: 'fashion',
    },
  },
  {
    id: 106,
    quantity: 100,
    product: {
      id: 2,
      name: '나이키',
      price: 100000,
      imageUrl: '',
      category: 'fashion',
    },
  },
];
