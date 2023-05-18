import { rest } from 'msw';
import products from './data/products.json';

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    ctx.delay(200);
    return res(ctx.status(200), ctx.json(products));
  }),

  rest.get('/products/empty', (req, res, ctx) => {
    ctx.delay(200);
    return res(ctx.status(200), ctx.json([]));
  }),

  rest.get('/products/error', (req, res, ctx) => {
    ctx.delay(200);
    return res(ctx.status(400), ctx.json(products));
  }),
];
