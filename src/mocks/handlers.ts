import { rest } from 'msw';
import products from './data/products.json';
import Cart from './storage/Cart';

const makeHandlers = (failProbability: number) => {
  if (failProbability < 0 || failProbability > 1) {
    throw new Error('failProbability must be between 0 and 1.');
  }

  return [
    rest.get('/products', (req, res, ctx) =>
      Math.random() < failProbability
        ? res(ctx.delay(2222), ctx.status(500))
        : res(
            ctx.delay(2222),
            ctx.status(200),
            ctx.set('Content-Type', 'application/json'),
            ctx.json(products)
          )
    ),

    rest.get('/cart-items', (req, res, ctx) =>
      Math.random() < failProbability
        ? res(ctx.status(500))
        : res(
            ctx.status(200),
            ctx.set('Content-Type', 'application/json'),
            ctx.json(Cart.getList())
          )
    ),

    rest.post('/cart-items', async (req, res, ctx) => {
      const { productId } = await req.json();

      if (Math.random() < failProbability) return res(ctx.status(500));

      Cart.setItem(productId, 1);

      return res(ctx.status(201), ctx.set('Content-Location', `/cart-items/${productId}`));
    }),

    rest.patch('/cart-items/:productId', async (req, res, ctx) => {
      const { productId } = req.params;
      const { quantity } = await req.json();

      if (Math.random() < failProbability) return res(ctx.delay(1000), ctx.status(500));

      Cart.setItem(Number(productId), quantity);

      return res(ctx.status(200));
    }),

    rest.delete('/cart-items/:productId', async (req, res, ctx) => {
      const { productId } = req.params;

      if (Math.random() < failProbability) return res(ctx.status(500));

      Cart.setItem(Number(productId), 0);

      return res(ctx.status(204));
    }),
  ];
};

export default makeHandlers;
