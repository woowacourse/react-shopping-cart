import products from '../fixtures/products';
import rest from '../rest';

export const handlers = [
  rest.on('GET /products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),

  rest.on('GET /products/:productId', (req, res, ctx) => {
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
