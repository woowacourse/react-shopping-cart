import { rest } from 'msw';

import { ShoppingCartProduct } from '@Types/index';

import localStorageHelper from '@Utils/localStorageHelper';

import { CART_ITEMS_URL, PRODUCTS_URL } from '@Constants/index';

import mockData from './mockData.json';

export const handlers = [
  rest.get(PRODUCTS_URL, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData));
  }),

  rest.get(CART_ITEMS_URL, (_, res, ctx) => {
    if (!localStorageHelper.hasKey('cartItems')) localStorageHelper.setInitValue('cartItems', []);
    const cartItems = localStorageHelper.getValue<ShoppingCartProduct[]>('cartItems');

    return res(ctx.status(200), ctx.json(cartItems));
  }),

  rest.post('/api/cart-items', async (req, res, ctx) => {
    const body = (await req.json()) as { productId: number };
    const productId = body.productId;

    const cartItems = localStorageHelper.getValue<ShoppingCartProduct[]>('cartItems');

    const newShoppingItem = {
      id: Date.now(),
      quantity: 1,
      product: mockData.find((product) => product.id === productId),
    };
    const newCartItems = [...cartItems, newShoppingItem];

    localStorageHelper.setValue('cartItems', newCartItems);

    return res(ctx.status(201));
  }),

  rest.delete('/cart-items/:cartItemId', async (req, res, ctx) => {
    const cartItemId = Number(req.params.cartItemId);

    const cartItems = localStorageHelper.getValue<ShoppingCartProduct[]>('cartItems');
    const newCartItems = cartItems.filter((cartItem) => cartItem.id !== cartItemId);
    localStorageHelper.setValue('cartItems', newCartItems);

    return res(ctx.status(204));
  }),

  rest.patch('/cart-items/:cartItemId', async (req, res, ctx) => {
    const cartItemId = Number(req.params.cartItemId);
    const { quantity } = (await req.json()) as { quantity: number };

    const cartItems = localStorageHelper.getValue<ShoppingCartProduct[]>('cartItems');
    const newCartItems = cartItems.map((item) => {
      if (item.id !== cartItemId) return item;
      return {
        ...item,
        quantity,
      };
    });

    localStorageHelper.setValue('cartItems', newCartItems);

    return res(ctx.status(200));
  }),
];
