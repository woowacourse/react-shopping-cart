import { rest } from "msw";
import { products } from "./data";

export const handlers = [
  //상품 목록 조회
  rest.get("/products", async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),
];
