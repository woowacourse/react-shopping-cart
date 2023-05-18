import { rest } from 'msw';

import initialData from '../data/mockData.json';

export const handlers = [
  rest.get('/productlist', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(2000), ctx.json(initialData));
  }),
];
