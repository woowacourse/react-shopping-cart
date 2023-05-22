import { rest } from 'msw';

import { getMockSelectItemApiUrl } from '@Api/index';

import mockSelectData from './data/mockSelectData.json';

export const shoppingCartHandler = [
  rest.get(getMockSelectItemApiUrl('GET'), (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockSelectData));
  }),
];
