import { rest } from 'msw';
import { products } from './data';

export const handlers = [
  rest.get('/products', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),
];
