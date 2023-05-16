import { rest } from 'msw';

import { MOCK_DATA_URL } from '@Constants/index';

import mockData from './data/mockData.json';

export const shoppingItemListHandler = [
  rest.get(MOCK_DATA_URL, (req, res, ctx) => {
    return res(ctx.delay(500), ctx.json([]));
  }),
];
