import { rest } from 'msw';

import { Product, ShoppingCartProduct } from '@Types/index';

import localStorageHelper from '@Utils/localStorageHelper';

import { CART_ITEMS_URL, PRODUCTS_URL } from '@Constants/index';

import mockData from './mockData.json';

export const handlers = [
  rest.get(PRODUCTS_URL, (_, res, ctx) => {
    if (!localStorageHelper.hasKey('products')) {
      localStorageHelper.setInitValue('products', mockData);
      localStorageHelper.setInitValue('cartItems', []);
    }

    const products = localStorageHelper.getValue<Product[]>('products');

    return res(ctx.status(200), ctx.json(products));
  }),

  rest.get(CART_ITEMS_URL, (_, res, ctx) => {
    const cartItems = localStorageHelper.getValue<ShoppingCartProduct[]>('cartItems');

    return res(ctx.status(200), ctx.json(cartItems));
  }),

  rest.post('/cart-items', async (req, res, ctx) => {
    const body = (await req.json()) as { productId: number };
    const productId = body.productId;

    const products = localStorageHelper.getValue<Product[]>('products');
    const cartItems = localStorageHelper.getValue<ShoppingCartProduct[]>('cartItems');

    const newShoppingItem = {
      id: Date.now(),
      quantity: 1,
      product: products.find((product) => product.id === productId),
    };
    const newCartItems = [...cartItems, newShoppingItem];

    localStorageHelper.setValue('cartItems', newCartItems);

    res(ctx.status(201));
  }),
];
