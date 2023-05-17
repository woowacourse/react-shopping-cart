import { rest } from 'msw';
import products from './data/products.json';
import Cart from './storage/Cart';

const handlers = [
  rest.get('/products', (req, res, ctx) =>
    res(ctx.delay(2222), ctx.status(200), ctx.json(products))
  ),

  rest.get('/cart-items', (req, res, ctx) =>
    res(ctx.delay(2222), ctx.status(200), ctx.json(Cart.getList()))
  ),

  rest.post('/cart-items', async (req, res, ctx) => {
    const { productId } = await req.json();

    Cart.setItem(productId, 1);

    return res(ctx.status(200));
  }),

  rest.post('/cart-items/:productId', async (req, res, ctx) => {
    const { productId } = req.params;
    const { quantity } = await req.json();

    Cart.setItem(Number(productId), quantity);

    return res(ctx.status(200));
  }),

  rest.delete('/cart-items/:productId', async (req, res, ctx) => {
    const { productId } = req.params;

    Cart.setItem(Number(productId), 0);

    return res(ctx.status(200));
  }),
];

export default handlers;
