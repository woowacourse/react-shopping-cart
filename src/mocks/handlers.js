import { rest } from 'msw';
import products from './fixtures/products.json';

export const handlers = [
  // 상품 조회 API
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),

  // // 상품 추가 API
  // rest.post("/api/products", (req, res, ctx) => {
  //   const newProduct = {
  //     id: Date.now(), // 현재 시간을 ID로 사용. 실제 상황에서는 서버에서 생성해주는 유니크한 ID를 사용합니다.
  //     ...req.body, // 클라이언트에서 보낸 상품 정보를 그대로 사용
  //   };

  //   products.push(newProduct); // 상품 목록에 새 상품 추가

  //   return res(ctx.status(201), ctx.json(newProduct));
  // }),
];
