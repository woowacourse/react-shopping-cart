import { rest } from 'msw';
import products from '../fixtures/products.json';

const PRODUCTS_BASE_URL = '/api/products';

export const productsHandlers = [
  // 상품 목록 조회 API
  rest.get(PRODUCTS_BASE_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),
];
