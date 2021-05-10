import { rest } from 'msw';
import { API_BASE_URL } from '../constants/API';
import { CART_ITEM_LIST_MOCK, PRODUCT_LIST_MOCK } from './mockData';

export const handlers = [
  rest.get(/\/productList\/?/, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(PRODUCT_LIST_MOCK));
  }),
  rest.get(/\/cart\/?/, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(CART_ITEM_LIST_MOCK));
  }),
];
