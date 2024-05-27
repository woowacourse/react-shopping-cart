import { CartItem } from '../../src/f_shared/index';
import { mockProducts } from '../products/mockProducts';

export const mockCarts: CartItem[] = [
  {
    id: 0 as CartItemId,
    quantity: 1,
    product: mockProducts[0],
  },
  {
    id: 1 as CartItemId,
    quantity: 2,
    product: mockProducts[1],
  },
  {
    id: 2 as CartItemId,
    quantity: 3,
    product: mockProducts[2],
  },
  {
    id: 3 as CartItemId,
    quantity: 4,
    product: mockProducts[3],
  },
  {
    id: 4 as CartItemId,
    quantity: 5,
    product: mockProducts[4],
  },
  {
    id: 5 as CartItemId,
    quantity: 6,
    product: mockProducts[5],
  },
  {
    id: 6 as CartItemId,
    quantity: 7,
    product: mockProducts[6],
  },
  {
    id: 7 as CartItemId,
    quantity: 8,
    product: mockProducts[7],
  },
  {
    id: 8 as CartItemId,
    quantity: 9,
    product: mockProducts[8],
  },
  {
    id: 9 as CartItemId,
    quantity: 10,
    product: mockProducts[9],
  },
];
