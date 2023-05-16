import { rest } from 'msw';

import { PRODUCTS_URL } from '@Constants/index';

import mockData from './mockData.json';

export const handlers = [
  rest.get(PRODUCTS_URL, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData));
  }),
];
