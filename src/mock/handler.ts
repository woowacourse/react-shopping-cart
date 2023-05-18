import { rest } from 'msw';
import productList from '../mock/productList.json';

export const handlers = [
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productList));
  }),
];
