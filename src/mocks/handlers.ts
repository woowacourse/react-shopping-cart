import { rest } from 'msw';
import json from './productList.json';
// 초기 상품 목록
const products = json.choonsikProducts;

export const handlers = [
  // 상품 목록 조회 API
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),

  // 상품 조회 API
  rest.get('/api/products/:productId}', (req, res, ctx) => {
    const { productId } = req.params;

    const product = products.find(({ id }) => id === Number(productId)) ?? null;

    return res(product ? ctx.status(200) : ctx.status(401), ctx.json(product));
  }),
  // 상품 추가 API
  // rest.post("/")
];
