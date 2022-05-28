/* eslint-disable arrow-body-style */
import { rest } from 'msw';

import { MOCK_DB } from 'mocks/db';

const productsHandlers = [
  rest.get('./shopping', (req, res, ctx) => {
    const { _page: page = 1, _limit: limit = 12 } = Object.fromEntries(
      req.url.searchParams.entries(),
    );

    const limitStartIndex = Number((page - 1) * limit);
    const limitEndIndex = limitStartIndex + Number(limit);

    const result = MOCK_DB.shopping.slice(limitStartIndex, limitEndIndex);

    return res(ctx.json(result), ctx.set({ 'x-total-count': MOCK_DB.shopping.length }));
  }),
];

export default productsHandlers;
