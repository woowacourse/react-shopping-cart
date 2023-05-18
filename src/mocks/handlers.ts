import { rest } from "msw";
import { KEY_LOCALSTORAGE_CART } from "../constants";
import mockData from "../mockData.json";
import { CartItemListType } from "../types/domain";
import { getLocalStorage } from "../utils";

export const handlers = [
  // 상품 목록 조회
  rest.get("/products", (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(mockData));
  }),

  // 장바구니 아이템 목록 조회
  rest.get("/cart-items", (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json(getLocalStorage<CartItemListType>(KEY_LOCALSTORAGE_CART, []))
    );
  }),

  // 장바구니 아이템 추가
  rest.post("/cart-items", (req, res, ctx) => {
    console.log(req);
    return res(
      ctx.status(200),
      ctx.json(getLocalStorage<CartItemListType>(KEY_LOCALSTORAGE_CART, []))
    );
  }),

  // 장바구니 아이템 수량 변경
  rest.post("/cart-items", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(getLocalStorage<CartItemListType>(KEY_LOCALSTORAGE_CART, []))
    );
  }),

  // 장바구니 아이템 삭제
  rest.post("/cart-items", (req, res, ctx) => {
    console.log(req);
    return res(
      ctx.status(200),
      ctx.json(getLocalStorage<CartItemListType>(KEY_LOCALSTORAGE_CART, []))
    );
  }),
];
