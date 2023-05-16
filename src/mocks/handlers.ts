import { rest } from 'msw';

import mockData from './mockData.json';

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(300), ctx.json(mockData));
  }),
];
