import { rest } from 'msw';

import { CartItemType } from '@Types/index';

import localStorageHelper from '@Utils/localStorageHelper';

import { FETCH_URL, SHOPPING_QUANTITY } from '@Constants/index';

import mockData from './mockData.json';

export const handlers = [
  rest.get(FETCH_URL.products, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData));
  }),

  rest.get(FETCH_URL.cartItems, (req, res, ctx) => {
    if (!localStorageHelper.hasKey('cartItems')) localStorageHelper.setInitValue('cartItems', []);
    const cartItems = localStorageHelper.getValue<CartItemType[]>('cartItems');

    return res(ctx.status(200), ctx.json(cartItems));
  }),

  rest.post(FETCH_URL.cartItems, async (req, res, ctx) => {
    const body = (await req.json()) as { productId: number };
    const productId = body.productId;

    const cartItems = localStorageHelper.getValue<CartItemType[]>('cartItems');

    const newShoppingItem = {
      id: Date.now(),
      quantity: SHOPPING_QUANTITY.DEFAULT,
      product: mockData.find((product) => product.id === productId),
    };
    const newCartItems = [...cartItems, newShoppingItem];

    localStorageHelper.setValue('cartItems', newCartItems);

    return res(ctx.status(201));
  }),

  rest.delete(`${FETCH_URL.cartItems}/:cartItemId`, async (req, res, ctx) => {
    const cartItemId = Number(req.params.cartItemId);

    const cartItems = localStorageHelper.getValue<CartItemType[]>('cartItems');
    const newCartItems = cartItems.filter((cartItem) => cartItem.id !== cartItemId);
    localStorageHelper.setValue('cartItems', newCartItems);

    return res(ctx.status(204));
  }),

  rest.patch(`${FETCH_URL.cartItems}/:cartItemId`, async (req, res, ctx) => {
    const cartItemId = Number(req.params.cartItemId);
    const { quantity } = (await req.json()) as { quantity: number };

    const cartItems = localStorageHelper.getValue<CartItemType[]>('cartItems');
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
