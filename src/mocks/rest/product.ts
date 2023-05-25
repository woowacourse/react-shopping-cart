import { rest } from 'msw';
import { products } from '../products';

const handleNonExistData = (assertData: any, responseData: any) => {
  if (!assertData) {
    return { statusCode: 400, responseData: {} };
  }
  return { statusCode: 200, responseData };
};

export const getProduct = rest.get('/products/:productId', (req, res, ctx) => {
  const productResponseData = products.find(
    (product) => product.id === +req.params.productId
  );

  const { statusCode, responseData } = handleNonExistData(
    productResponseData,
    productResponseData
  );

  return res(ctx.status(statusCode), ctx.json(responseData));
});

export const putProduct = rest.put('/products/:productId', (req, res, ctx) => {
  let matchProduct = products.find(
    (product) => product.id === +req.params.productId
  );
  const { statusCode, responseData } = handleNonExistData(matchProduct, {});
  return res(ctx.status(statusCode), ctx.json(responseData));
});

export const getProducts = rest.get('/products', (_, res, ctx) => {
  return res(ctx.status(200), ctx.json(products));
});
