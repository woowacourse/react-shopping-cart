import { rest } from 'msw';

import { CART_LIST_LOCAL_STORAGE_KEY } from '../constants';
import initialData from '../data/mockData.json';

export const handlers = [
  rest.get('/productlist', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(2000), ctx.json(initialData));
  }),

  rest.get('/cartList', (req, res, ctx) => {
    const storeKey = CART_LIST_LOCAL_STORAGE_KEY;
    const savedValue = localStorage.getItem(storeKey);

    if (savedValue !== null) {
      //   setSelf(JSON.parse(savedValue));
      return res(ctx.status(200), ctx.delay(2000), ctx.json(JSON.parse(savedValue)));
    }
    return res(ctx.status(200), ctx.delay(1000), ctx.json([]));
  }),
];
