import { CART_KEY } from 'constants/storeKey';
import { rest } from 'msw';

const cartProducts = localStorage.getItem(CART_KEY) ?? [];

export const cart = [
  rest.get('/cart-items', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cartProducts));
  }),
];
