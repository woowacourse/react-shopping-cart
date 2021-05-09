import { rest } from 'msw';
import { PRODUCT_LIST_MOCK } from './mockData';

export const handlers = [
  rest.get(/\/productList\/?/, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(JSON.stringify(PRODUCT_LIST_MOCK)));
  }),
];
