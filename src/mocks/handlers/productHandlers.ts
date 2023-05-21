import { rest } from 'msw';
import products from '../fixtures/products.json';

export const productHandlers = [
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.delay(10), ctx.status(200), ctx.json(products));
  }),

  rest.get('/api/products/:id', (req, res, ctx) => {
    const productId = Number(req.params.id);
    const product = products.find((product) => product.id === productId);

    if (!product) {
      return res(
        ctx.status(404),
        ctx.json({ message: '해당 상품이 존재하지 않습니다.' })
      );
    }

    return res(ctx.status(200), ctx.json(product));
  }),
];
