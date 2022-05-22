import { rest } from 'msw';
import { productList } from './data';

let cartList = [];

const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productList));
  }),

  rest.get('/products/:id', (req, res, ctx) => {
    const id = +req.params.id;
    const product = productList.find(({ id: productId }) => productId === id);
    return res(ctx.status(200), ctx.json(product));
  }),

  rest.get('/cart', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cartList));
  }),

  rest.post('/cart/:id', (req, res, ctx) => {
    const id = +req.params.id;
    const index = cartList.findIndex(({ id: productId }) => productId === id);
    const product = productList.find(({ id: productId }) => productId === id);

    if (index === -1) {
      cartList.push({ ...product, quantity: 1 });
    }
    return res(ctx.status(200), ctx.json(cartList));
  }),

  rest.delete('/cart/:id', (req, res, ctx) => {
    const id = +req.params.id;
    cartList = cartList.filter((item) => item.id !== id);
    return res(ctx.status(200), ctx.json(cartList));
  }),

  rest.put('/cart/:id/:quantity', (req, res, ctx) => {
    const id = +req.params.id;
    const quantity = +req.params.quantity;
    const cartItemIndex = cartList.findIndex((cartItem) => cartItem.id === id);

    cartList[cartItemIndex].quantity = quantity;
    return res(ctx.status(200), ctx.json(cartList));
  }),
];

export { handlers };
