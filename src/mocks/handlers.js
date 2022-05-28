import { rest } from 'msw';
import products from 'mockData';

export const handlers = [
  rest.get('/products/:id', (req, res, ctx) => {
    const productId = Number(req.params.id);
    const product = products.find((product) => product.id === productId);

    return res(ctx.status(200), ctx.json(product));
  }),

  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),
];
