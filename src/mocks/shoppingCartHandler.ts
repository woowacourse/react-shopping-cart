import { getMockSelectItemApiUrl } from '@Api/index';
import { rest } from 'msw';

import mockSelectData from './data/mockSelectData.json';

export const shoppingCartHandler = [
  rest.get(getMockSelectItemApiUrl('GET'), (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockSelectData));
  }),
];
