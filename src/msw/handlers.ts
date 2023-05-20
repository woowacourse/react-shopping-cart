import { rest } from 'msw';

import mockData from '../assets/mock.json';
import cartMock from '../assets/cartMock.json';

const minDelay = 300;
const maxDelay = 500;

const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.delay(delay), ctx.status(200), ctx.json(mockData));
  }),

  rest.get('/cart-items', (req, res, ctx) => {
    return res(ctx.delay(delay), ctx.status(200), ctx.json(cartMock));
  }),

  rest.patch('/cart-items/:id', (req, res, ctx) => {
    return res(ctx.delay(delay), ctx.status(200));
  }),
];
