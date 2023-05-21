import { getMockShoppingItemApiUrl } from '@Api/index';
import { rest } from 'msw';

import mockData from './data/mockData.json';

export const shoppingItemListHandler = [
  rest.get(getMockShoppingItemApiUrl('GET'), (req, res, ctx) => {
    // status가 200인 경우: ctx.status(200), ctx.json(mockData)
    // 딜레이가 오래 걸리는 경우: ctx.delay(1000), ctx.status(200), ctx.json(mockData)
    // status가 200이지만 물품이 없는 경우:  ctx.status(200), ctx.json([])
    // status가 400대인 경우:  ctx.status(404)
    // status가 500대인 경우:  ctx.status(500)
    return res(ctx.status(200), ctx.json(mockData));
  }),
];
