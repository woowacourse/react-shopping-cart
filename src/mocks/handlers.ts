import { rest } from 'msw';
import json from './productList.json';
// 초기 상품 목록
const products = json.choonsikProducts;

export const handlers = [
  // 상품 조회 API
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),
  // 상품 추가 API
];
