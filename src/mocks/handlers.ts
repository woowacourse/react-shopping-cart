import { PRODUCT_LIST } from 'mockData/productList';
import { rest } from 'msw';

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    const data = PRODUCT_LIST.productList;

    if (!data) {
      return res(ctx.status(403), ctx.json(data));
    }

    return res(ctx.status(200), ctx.json(data));
  }),

  rest.post('/products', (req, res, ctx) => {}),
];
