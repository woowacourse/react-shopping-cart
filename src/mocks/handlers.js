import { rest } from 'msw';
import { products } from './data';

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.json(products));
  }),

  rest.get('/products/:id', (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.json(products[id]));
  }),
];
