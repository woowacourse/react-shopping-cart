import { Cart, CartId } from '../../src/e_entities/cart/index';
import { mockProducts } from '../products/mockProducts';

export const mockCarts: Cart[] = [
  {
    id: 0 as CartId,
    quantity: 1,
    product: mockProducts[0],
  },
  {
    id: 1 as CartId,
    quantity: 2,
    product: mockProducts[1],
  },
  {
    id: 2 as CartId,
    quantity: 3,
    product: mockProducts[2],
  },
  {
    id: 3 as CartId,
    quantity: 4,
    product: mockProducts[3],
  },
  {
    id: 4 as CartId,
    quantity: 5,
    product: mockProducts[4],
  },
  {
    id: 5 as CartId,
    quantity: 6,
    product: mockProducts[5],
  },
  {
    id: 6 as CartId,
    quantity: 7,
    product: mockProducts[6],
  },
  {
    id: 7 as CartId,
    quantity: 8,
    product: mockProducts[7],
  },
  {
    id: 8 as CartId,
    quantity: 9,
    product: mockProducts[8],
  },
  {
    id: 9 as CartId,
    quantity: 10,
    product: mockProducts[9],
  },
];
