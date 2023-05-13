import { rest } from 'msw';

const cart = localStorage.getItem('cart') ?? [];
const CART_BASE_URL = '/api/cart-items';

export const cartHandlers = [
  // 장바구니 목록 조회 API
  rest.get(CART_BASE_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cart));
  }),
];
