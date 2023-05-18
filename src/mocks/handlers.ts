import { rest } from 'msw';
import mockData from './mockData.json';

export const handlers = [
  rest.get('/api/products', async (req, res, ctx) => {
    await sleep(200);

    return res(ctx.status(200), ctx.json(mockData));
  }),
];

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
