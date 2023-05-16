import { rest } from 'msw';
import { products } from '../data';

export const getProduct = rest.get('/products/:productId', (req, res, ctx) => {
  const product = products.find(
    (product) => product.id === +req.params.productId
  );
  // TODO: 에러처리 스펙에 맞게 변경
  const responseData = product ?? {
    errorMsg: 'no exist data',
  };
  return res(ctx.status(200), ctx.json(responseData));
});

export const putProduct = rest.put('/products/:productId', (req, res, ctx) => {
  let matchProduct = products.find(
    (product) => product.id === +req.params.productId
  );

  if (!matchProduct) {
    return res(
      ctx.status(400),
      ctx.json({
        errorMsg: 'no exist data',
      })
    );
  }
  // TODO: 성공일 때 구체화 하기
  return res(ctx.status(200));
});

export const getProducts = rest.get('/products', (_, res, ctx) => {
  return res(ctx.status(200), ctx.json(products));
});
