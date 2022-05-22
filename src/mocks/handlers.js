import { rest } from 'msw';
import { cart, products } from './mock';

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),

  rest.get('/products/:id', (req, res, ctx) => {
    const { id } = req.params;
    const product = products.find((product) => product.id === id);

    return res(ctx.status(200), ctx.json(product));
  }),

  rest.get('/cart', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cart));
  }),

  rest.post('/cart', (req, res, ctx) => {
    const product = req.body;
    cart.push(product);

    return res(ctx.status(200));
  }),

  rest.delete('/cart/:id', (req, res, ctx) => {
    const { id } = req.params;
    const productIndex = cart.findIndex((product) => product.id === id);
    cart.splice(productIndex - 1, 1);

    return res(ctx.status(200));
  }),
];
