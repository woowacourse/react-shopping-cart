import { Cart } from '../types/cart';

export const CONVERSE: Cart = {
  id: 1,
  quantity: 1,
  product: {
    id: 12,
    name: '컨버스',
    price: 20000,
    imageUrl: '',
    category: 'fashion',
  },
};

export const NIKE: Cart = {
  id: 2,
  quantity: 3,
  product: {
    id: 2,
    name: '나이키',
    price: 2000,
    imageUrl: '',
    category: 'fashion',
  },
};
