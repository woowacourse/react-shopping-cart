import { rest } from 'msw';
import { products } from './data';

export const handlers = [
  rest.get('/products', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),
  rest.get('/products/:productId', (req, res, ctx) => {
    const product = products.find(
      (product) => product.id === +req.params.productId
    );
    // TODO: 에러처리 스펙에 맞게 변경
    const responseData = product ?? {
      errorMsg: 'no exist data',
    };
    return res(ctx.status(200), ctx.json(responseData));
  }),
];
