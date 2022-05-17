import PATH from 'constants/path';
import axios from 'axios';
import db from 'db.json';
import { rest } from 'msw';

const handlers = [
  rest.get(
    `${axios.defaults.baseURL}${PATH.REQUEST_PRODUCT}`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(db.products));
    }
  ),
  rest.get(
    `${axios.defaults.baseURL}${PATH.REQUEST_PRODUCT}/:id`,
    (req, res, ctx) => {
      const product = db.products.filter(
        (productInfo) => productInfo.id === Number(req.params.id)
      )[0];

      return res(ctx.status(200), ctx.json(product));
    }
  ),
];

export { handlers };
