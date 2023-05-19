import { PRODUCT_LIST } from '@mockData/productList';
import { rest } from 'msw';

export const handlers = [
  rest.get('api/products', (req, res, ctx) => {
    return res(
      ctx.set('Content-Type', 'application/json'),
      ctx.status(200),
      ctx.json(PRODUCT_LIST.productList),
      ctx.delay(1200)
    );
  }),
];
