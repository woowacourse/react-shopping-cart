import { rest } from 'msw';

const cart = localStorage.getItem('cart') ?? [];

export const cartHandlers = [
  // 장바구니 목록 조회 API
  rest.get('/api/cart-items', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cart));
  }),
];
