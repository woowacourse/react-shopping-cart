import { rest } from 'msw';
import products from '../fixtures/products.json';
import { PRODUCTS_BASE_URL } from '../../constants/api';

export const productsHandlers = [
  // 상품 목록 조회
  rest.get(PRODUCTS_BASE_URL, (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json(products));
  }),

  // 상품 조회
  rest.get(`${PRODUCTS_BASE_URL}/:id`, (req, res, ctx) => {
    const productId = Number(req.params.id);
    const product = products.find((product) => product.id === productId);

    if (product === undefined) {
      return res(
        ctx.status(404),
        ctx.json({ message: '해당 상품이 존재하지 않습니다.' }),
      );
    }

    return res(ctx.status(200), ctx.json(product));
  }),
];
