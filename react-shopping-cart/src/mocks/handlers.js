import { rest } from 'msw';
import { PRODUCT_LIST_MOCK_DATA } from './mockData';

const fetchProductList = rest.get(`${process.env.REACT_APP_API_HOST}/product`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(PRODUCT_LIST_MOCK_DATA));
});

const fetchProductDetail = rest.get(
  `${process.env.REACT_APP_API_HOST}/product/:id`,
  (req, res, ctx) => {
    const { id } = req.params;

    const productInfo = PRODUCT_LIST_MOCK_DATA.find(product => product.id === Number(id));

    if (!productInfo) {
      return res(ctx.status(404));
    }

    return res(ctx.status(200), ctx.json(productInfo));
  }
);

const handlers = [fetchProductList, fetchProductDetail];

export default handlers;
