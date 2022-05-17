import { rest } from 'msw';
import db from '../db.json';

export const handlers = [
  rest.get(`${process.env.REACT_APP_BASE_URL}/productList`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(db));
  }),
  rest.get(`${process.env.REACT_APP_BASE_URL}/productList/:id`, (req, res, ctx) => {
    const { id: targetId } = req.params;
    const productList = db.productList;
    const product = productList.find((product) => product.id === Number(targetId));
    return res(ctx.status(200), ctx.json(product));
  }),
];
