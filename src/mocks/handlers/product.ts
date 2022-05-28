import { rest } from 'msw';
import { productList } from 'mocks/data';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

export const loadProduct = rest.get(`${BASE_URL}/productList/:id`, (req, res, ctx) => {
  const id = Number(req.params.id);
  const product = productList.find((product) => id === product.id);

  if (!product) return res(ctx.status(404));

  return res(ctx.status(200), ctx.json(product));
});

export const loadProductList = rest.get(`${BASE_URL}/productList`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(productList));
});
