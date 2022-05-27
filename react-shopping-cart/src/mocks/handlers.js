import { products } from 'mocks/mockData';
import { rest } from 'msw';

export const handlers = [
  rest.get(`${process.env.REACT_APP_API_HOST}/product`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json([...products]))
  ),
];
