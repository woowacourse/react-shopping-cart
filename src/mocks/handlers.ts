import mockProducts from './mockProducts.json';
import { rest } from 'msw';

const BASE = 'api';

export const handlers = [
  rest.get(`${BASE}/products`, (req, res, ctx) => {
    return res(ctx.json(mockProducts));
  }),
];
