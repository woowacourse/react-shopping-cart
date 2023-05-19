import { rest } from 'msw';
import { cartItems, products } from './mockData';
import { CartItem } from '../types';

import { CART_BASE_URL, PRODUCT_BASE_URL } from '../constants/url';

export const handlers = [
  // 상품 조회
  rest.get(PRODUCT_BASE_URL, (req, res, ctx) =>
    res(ctx.delay(1000), ctx.status(200), ctx.json(products)),
  ),

  // 장바구니 아이템 목록 조회
  rest.get(CART_BASE_URL, (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(cartItems));
  }),

  // 장바구니 아이템 추가
  rest.post(CART_BASE_URL, async (req, res, ctx) => {
    const { id } = await req.json();

    const item = {
      id: id,
      quantity: 1,
    };
    return res(ctx.status(201), ctx.json(item));
  }),

  // 장바구니 아이템 수량 변경
  rest.patch<CartItem>(`${CART_BASE_URL}/:id`, async (req, res, ctx) => {
    const { id, quantity } = await req.json();

    const item = {
      id: id,
      quantity: quantity,
    };

    return res(ctx.status(200), ctx.json(item));
  }),

  // 장바구니 아이템 삭제
  rest.delete(`${CART_BASE_URL}/:id`, async (req, res, ctx) => {
    return res(ctx.status(204));
  }),
];
