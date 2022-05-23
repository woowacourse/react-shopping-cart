import { rest } from 'msw';
import SERVER_URL from '../../configs/api';
import * as db from '../db.json';

const { products } = db;

const productsHandlers = [
  rest.get(`${SERVER_URL}/products/:id`, (req, res, ctx) => {
    const { id } = req.params;

    if (id) {
      return res(
        ctx.status(200),
        ctx.json(products.find((product) => product.id === id))
      );
    }
  }),
  rest.get(`${SERVER_URL}/products`, (req, res, ctx) => {
    const ids = req.url.searchParams.getAll('id');

    if (ids.length > 0) {
      return res(
        ctx.status(200),
        ctx.json(ids.map((id) => products.find((product) => product.id === id)))
      );
    }

    return res(ctx.status(200), ctx.json(products));
  }),
];

export default productsHandlers;
