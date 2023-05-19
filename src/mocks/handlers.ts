import { PRODUCT_LIST } from '@mockData/productList';
import { rest } from 'msw';
import { API_URL_PRODUCT_LIST } from '@constants/common';

export const handlers = [
  rest.get(API_URL_PRODUCT_LIST, (req, res, ctx) => {
    return res(
      ctx.set('Content-Type', 'application/json'),
      ctx.status(200),
      ctx.json(PRODUCT_LIST.productList),
      ctx.delay(1200)
    );
  }),
];
