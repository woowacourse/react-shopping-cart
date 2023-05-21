import { rest } from 'msw';
import { product } from './mockData';

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(product));
  }),
];
