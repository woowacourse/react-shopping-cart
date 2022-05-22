import { rest } from 'msw';
import { productList } from './data';

const cartList = [];

const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.json(productList));
  }),

  rest.get('/products/:id', (req, res, ctx) => {
    const id = +req.params.id;
    const product = productList.find(({ id: productId }) => productId === id);
    return res(ctx.json(product));
  }),

  rest.get('/cart', (req, res, ctx) => {
    return res(ctx.json(cartList));
  }),

  rest.post('/cart/:id', (req, res, ctx) => {
    const id = +req.params.id;
    const index = cartList.findIndex(({ id: productId }) => productId === id);
    const product = productList.find(({ id: productId }) => productId === id);

    if (index === -1) {
      cartList.push({ ...product, quantity: 1 });
    }
    return res(ctx.json(cartList));
  }),

  rest.delete('/cart/:id', (req, res, ctx) => {
    const id = +req.params.id;
    const index = cartList.findIndex(({ id: productId }) => productId === id);

    cartList.splice(index, 1);
    return res(ctx.status(200), ctx.json(cartList));
  }),
];

export { handlers };
