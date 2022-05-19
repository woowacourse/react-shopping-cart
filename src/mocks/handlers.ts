import { API_URL } from '@/api/constants';
import { rest } from 'msw';
import product from './data/product.json';

export const hanlders = [
  rest.get(`${API_URL}products`, (req, res, ctx) => {
    const {
      url: { searchParams },
    } = req;
    const page = Number(searchParams.get('_page')) | 1;
    const limit = Number(searchParams.get('_limit')) | 10;

    if (page === 1 || page === 0) {
      return res(ctx.set('x-total-count', `${product.length}`), ctx.json(product.slice(0, limit)));
    }

    return res(ctx.set('x-total-count', `${product.length}`), ctx.json(product.slice(limit)));
  }),
];
