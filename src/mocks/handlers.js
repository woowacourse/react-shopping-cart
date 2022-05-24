import { rest } from 'msw';
import { productList } from 'assets/mock';

let cartStorage = [];

export const handlers = [
  rest.get('/products/:id', (req, res, ctx) => {
    const id = +req.params.id;

    const product = productList.find(({ id: productId }) => productId === +id);
    if (!product) return res(ctx.status(400));
    return res(ctx.json(product));
  }),

  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productList));
  }),

  rest.delete('/cart/:id', (req, res, ctx) => {
    const id = +req.params.id;
    cartStorage = cartStorage.filter((item) => item.id !== id);
    return res(ctx.status(200), ctx.json(cartStorage));
  }),

  rest.post('/cart/:id', (req, res, ctx) => {
    const id = +req.params.id;

    const index = cartStorage.findIndex(
      ({ id: productId }) => productId === id,
    );
    const product = productList.find(({ id: productId }) => productId === id);

    if (index === -1) {
      cartStorage.push({ ...product, quantity: 1 });
    } else {
      const newCartStorage = cartStorage.map((item, itemIndex) => {
        if (index === itemIndex)
          return { ...item, quantity: item.quantity + 1 };
        return item;
      });
      cartStorage = newCartStorage;
    }

    return res(ctx.status(200), ctx.json(cartStorage));
  }),

  rest.get('/cart', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cartStorage));
  }),

  rest.put('/cart/:id/:quantity', (req, res, ctx) => {
    const id = +req.params.id;
    const quantity = +req.params.quantity;

    const newCartStorage = cartStorage.map((item) => {
      if (item.id === id) return { ...item, quantity };
      return item;
    });
    cartStorage = newCartStorage;
    return res(ctx.status(200), ctx.json(cartStorage));
  }),
];
