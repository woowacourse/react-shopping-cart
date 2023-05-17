import { rest } from 'msw';
import data from './productList.json';

export const handlers = [
  // 상품 조회 API
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(data));
  }),
];
