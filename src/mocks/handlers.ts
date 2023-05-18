import { rest } from 'msw';

import products from './data/products.json';

export const handlers = [
  rest.get('/products', async (req, res, ctx) => {
    await sleep(200);
    return res(ctx.status(200), ctx.json(products));
  }),
];

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
