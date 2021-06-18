import { CartItem, CartItemOnServer, Order, Product } from '../types';

export const PRODUCT_LIST_MOCK: Product[] = [
  {
    productId: 1,
    imageUrl: 'https://picsum.photos/200/200',
    name: 'test product name',
    price: 43400,
  },
  {
    productId: 2,
    imageUrl: 'https://picsum.photos/200/200',
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
  },
  {
    productId: 3,
    imageUrl: 'https://picsum.photos/200/200',
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
  },
  {
    productId: 4,
    imageUrl: 'https://picsum.photos/200/200',
    name: 'test add Cart Item',
    price: 43400,
  },
  {
    productId: 5,
    imageUrl: 'https://picsum.photos/200/200',
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
  },
];

export const CART_ITEM_LIST_MOCK: CartItemOnServer[] = [
  {
    cartId: 1,
    imageUrl: 'https://picsum.photos/200/200',
    name: 'test cart item name',
    price: 43400,
  },
  {
    cartId: 2,
    imageUrl: 'https://picsum.photos/200/200',
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
  },
  {
    cartId: 3,
    imageUrl: 'https://picsum.photos/200/200',
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
  },
  {
    cartId: 4,
    imageUrl: 'https://picsum.photos/200/200',
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
  },
  {
    cartId: 5,
    imageUrl: 'https://picsum.photos/200/200',
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
  },
];

export const ORDER_LIST_MOCK: Order[] = [
  {
    orderId: 1,
    orderDetails: [
      {
        productId: 1,
        imageUrl: 'https://picsum.photos/200/200',
        name: 'test cart item name',
        price: 43400,
        quantity: 3,
      },
      {
        productId: 2,
        imageUrl: 'https://picsum.photos/200/200',
        name: 'PET보틀-정사각(420ml)',
        price: 43400,
        quantity: 3,
      },
      {
        productId: 3,
        imageUrl: 'https://picsum.photos/200/200',
        name: 'PET보틀-정사각(420ml)',
        price: 43400,
        quantity: 3,
      },
    ],
  },
];
