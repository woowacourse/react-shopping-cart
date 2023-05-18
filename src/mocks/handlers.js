import { PRODUCT_LIST } from 'mockData/productList';
import { rest } from 'msw';

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    const data = PRODUCT_LIST.productList;

    if (!data) {
      return res(ctx.status(403), ctx.json(data));
    }

    return res(ctx.status(200), ctx.json(data));
  }),

  // rest.post('/login', (req, res, ctx) => {
  //   // Persist user's authentication in the session
  //   sessionStorage.setItem('is-authenticated', 'true')

  //   return res(
  //     // Respond with a 200 status code
  //     ctx.status(200),
  //   )
  // }),
];
