import { rest } from 'msw';
import products from 'mocks/fixtures/products.json';

export const product = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),
];
