import { rest } from 'msw';

import mockSelectData from './data/mockSelectData.json';
import { getMockSelectItemApiUrl } from '../api/index';

export const shoppingCartHandler = [
  rest.get(getMockSelectItemApiUrl('GET'), (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockSelectData));
  }),
];
