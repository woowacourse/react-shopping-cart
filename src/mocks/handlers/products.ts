import { rest } from 'msw';
import products from '../fixtures/products';

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),

  rest.get('/products/:productId', (req, res, ctx) => {
    const { productId } = req.params;

    const product = products.find((it) => String(it.id) === productId) ?? null;
    if (product === null) {
      return res(
        ctx.status(404),
        ctx.json({
          message: `${productId}에 해당하는 제품은 존재하지 않습니다.`,
        }),
      );
    }

    return res(ctx.status(200), ctx.json(product));
  }),
];
