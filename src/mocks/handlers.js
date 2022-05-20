import { rest } from 'msw';

export const handlers = [
  rest.post('/products', (req, res, ctx) => {
    // Persist user's authentication in the session
    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),
];
