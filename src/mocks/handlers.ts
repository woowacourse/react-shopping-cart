import { getUUID } from './../utils/uuid';
import { rest } from 'msw';
import { MockCart } from './fixtures/cart';
import { MockProducts } from './fixtures/products';

export const handlers = [
  rest.post('/cart/:id', (req, res, ctx) => {
    const { id, quantity } = req.params;

    const product = MockProducts.items.find((item) => item.id === Number(id));

    if (product) {
      const newCartItem = {
        id: getUUID(),
        quantity: Number(quantity),
        products: product,
      };
      MockCart.cart.push(newCartItem);

      return res(ctx.status(200), ctx.json(MockCart));
    }

    return res(ctx.status(404));
  }),

  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MockProducts));
  }),

  rest.get('/cart', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MockCart));
  }),
];
