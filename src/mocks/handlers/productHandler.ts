import { rest } from 'msw';
import { products } from '../../components/data/mockData';

export const productHandler = [
  rest.get('/products', (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.json(products));
  }),
];
