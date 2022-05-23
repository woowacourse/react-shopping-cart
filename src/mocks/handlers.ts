import PATH from 'constants/path';
import axios from 'configs/api';
import db from 'db.json';
import { rest } from 'msw';

const { baseURL } = axios.defaults;

const handlers = [
  rest.get(`${baseURL}${PATH.REQUEST_PRODUCT}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(db.products));
  }),
  rest.get(`${baseURL}${PATH.REQUEST_PRODUCT}/:id`, (req, res, ctx) => {
    const product = db.products.find(
      (productInfo) => productInfo.id === Number(req.params.id)
    );

    return res(ctx.status(200), ctx.json(product));
  }),
];

export { handlers };
