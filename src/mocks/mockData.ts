import { CartItem, CartItemOnServer, Order, Product } from '../types';

export const PRODUCT_LIST_MOCK: Product[] = [
  {
    product_id: 1,
    image_url: 'https://picsum.photos/200/200',
    name: 'test product name',
    price: 43400,
  },
  {
    product_id: 2,
    image_url: 'https://picsum.photos/200/200',
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
  },
  {
    product_id: 3,
    image_url: 'https://picsum.photos/200/200',
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
  },
  {
    product_id: 4,
    image_url: 'https://picsum.photos/200/200',
    name: 'test add Cart Item',
    price: 43400,
  },
  {
    product_id: 5,
    image_url: 'https://picsum.photos/200/200',
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
  },
];

export const CART_ITEM_LIST_MOCK: CartItemOnServer[] = [
  {
    cart_id: 1,
    image_url: 'https://picsum.photos/200/200',
    name: 'test cart item name',
    price: 43400,
  },
  {
    cart_id: 2,
    image_url: 'https://picsum.photos/200/200',
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
  },
  {
    cart_id: 3,
    image_url: 'https://picsum.photos/200/200',
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
  },
  {
    cart_id: 4,
    image_url: 'https://picsum.photos/200/200',
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
  },
  {
    cart_id: 5,
    image_url: 'https://picsum.photos/200/200',
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
  },
];

export const ORDER_LIST_MOCK: Order[] = [
  {
    order_id: 1,
    order_details: [
      {
        product_id: 1,
        image_url: 'https://picsum.photos/200/200',
        name: 'test cart item name',
        price: 43400,
        quantity: 3,
      },
      {
        product_id: 2,
        image_url: 'https://picsum.photos/200/200',
        name: 'PET보틀-정사각(420ml)',
        price: 43400,
        quantity: 3,
      },
      {
        product_id: 3,
        image_url: 'https://picsum.photos/200/200',
        name: 'PET보틀-정사각(420ml)',
        price: 43400,
        quantity: 3,
      },
    ],
  },
];
