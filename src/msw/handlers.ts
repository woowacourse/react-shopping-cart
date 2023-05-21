import { rest } from 'msw';

import mockData from '../assets/productMock.json';

const minDelay = 300;
const maxDelay = 500;

const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    const errorCode = req.url.searchParams.get('error_code');

    if (errorCode) {
      return res(ctx.delay(delay), ctx.status(Number(errorCode)));
    }

    return res(ctx.delay(delay), ctx.status(200), ctx.json(mockData));
  }),

  rest.get('/cart-items', (req, res, ctx) => {
    const errorCode = req.url.searchParams.get('error_code');

    if (errorCode) {
      return res(ctx.delay(delay), ctx.status(Number(errorCode)));
    }

    const localCart = localStorage.getItem('cartState');
    const cart = localCart ? JSON.parse(localCart) : [];

    return res(ctx.delay(delay), ctx.status(200), ctx.json(cart));
  }),

  rest.post('/cart-items', (req, res, ctx) => {
    const errorCode = req.url.searchParams.get('error_code');

    if (errorCode) {
      return res(ctx.delay(delay), ctx.status(Number(errorCode)));
    }

    return res(ctx.delay(delay), ctx.status(201));
  }),

  rest.patch('/cart-items/:id', (req, res, ctx) => {
    const errorCode = req.url.searchParams.get('error_code');

    if (errorCode) {
      return res(ctx.delay(delay), ctx.status(Number(errorCode)));
    }

    return res(ctx.delay(delay), ctx.status(200));
  }),

  rest.delete('cart-items/:id', (req, res, ctx) => {
    const errorCode = req.url.searchParams.get('error_code');

    if (errorCode) {
      return res(ctx.delay(delay), ctx.status(Number(errorCode)));
    }

    return res(ctx.delay(delay), ctx.status(204));
  }),
];
