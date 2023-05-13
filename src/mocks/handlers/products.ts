import { rest } from 'msw';
import products from '../fixtures/products.json';
import { PRODUCTS_BASE_URL } from '../../constants';

export const productsHandlers = [
  // 상품 목록 조회 API
  rest.get(PRODUCTS_BASE_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),

  // 상품 조회 API
  rest.get(`${PRODUCTS_BASE_URL}/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const product = products.find((product) => String(product.id) === id);

    if (product === undefined) {
      return res(ctx.status(404));
    }

    return res(ctx.status(200), ctx.json(product));
  }),
];
