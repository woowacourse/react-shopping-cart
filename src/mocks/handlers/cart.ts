import { rest } from 'msw';
import cartProducts from 'mocks/fixtures/cartProducts.json';

export const cart = [
  rest.get('/cart-items', (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json(cartProducts));
  }),
];
