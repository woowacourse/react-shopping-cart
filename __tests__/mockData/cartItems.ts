import { CartItem } from '@appTypes/shoppingCart';

export const NIKE: CartItem = {
  id: 106,
  quantity: 1,
  product: {
    id: 2,
    name: '나이키',
    price: 1000,
    imageUrl: '',
    category: 'fashion',
  },
};

export const ADIDAS: CartItem = {
  id: 306,
  quantity: 1,
  product: {
    id: 3,
    name: '아디다스',
    price: 2000,
    imageUrl: '',
    category: 'fashion',
  },
};
export const ASICS: CartItem = {
  id: 634,
  quantity: 1,
  product: {
    id: 21,
    name: '아식스',
    price: 20000,
    imageUrl: '',
    category: 'fashion',
  },
};

export const INITIAL_ITEMS: CartItem[] = [
  {
    ...NIKE,
    quantity: 3,
  },
  {
    ...ADIDAS,
    quantity: 2,
  },
  ASICS,
];
