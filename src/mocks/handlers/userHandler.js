import { API } from 'constants/api';
import { users } from 'mocks/data';
import { rest } from 'msw';

const userHandler = [
  rest.post(`/${API.AUTH}/login`, (req, res, ctx) => {
    const { userid } = req.headers['_headers'];

    return res(
      ctx.status(200),
      ctx.json(Object.prototype.hasOwnProperty.call(users, userid))
    );
  }),

  rest.post(`/${API.AUTH}/logout`, (req, res, ctx) => {
    const { userid } = req.headers['_headers'];

    return res(ctx.status(200), ctx.json(true));
  }),
];

export default userHandler;
