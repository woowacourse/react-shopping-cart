import { rest } from 'msw';
import products from '../fixtures/products.json';

export const productHandlers = [
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.delay(10), ctx.status(200), ctx.json(products));
  }),
];
