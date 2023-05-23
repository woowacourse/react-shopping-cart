import { rest } from 'msw';

import { CART_API_URL } from '@Constants/index';

import mockSelectData from './data/mockSelectData.json';

export const shoppingCartHandler = [
  rest.get(CART_API_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockSelectData));
  }),

  rest.post(CART_API_URL, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.put(CART_API_URL, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.delete(CART_API_URL, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
