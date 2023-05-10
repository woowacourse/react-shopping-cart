import { rest } from 'msw';
import { products } from '../data/mockData';

export const handlers = [
  // 제품 목록
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),
];
