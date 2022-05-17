import { rest } from "msw";
import products from "./products.json";

export const handlers = [
  // product list를 요청한다 (상품 리스트 페이지)
  rest.get("/api/products", (req, res, ctx) => {
    return res(ctx.json(products));
  }),
  // product id를 요청한다(상품 상세 페이지)
  rest.get("/product/:id", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  // cart에 담긴 product-list를 요청한다 (장바구니 페이지)
  rest.post("cart/add/:id", (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  // order-list (주문 목록 페이지)

  // order-id (상품의 주문서 페이지)
];
