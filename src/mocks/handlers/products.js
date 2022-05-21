/* eslint-disable arrow-body-style */
import { rest } from 'msw';
import { MOCK_DB } from 'mocks/db';

const HOST_NAME = process.env.REACT_APP_API_URL;

const productsHandlers = [
  rest.get(`${HOST_NAME}/shopping`, (req, res, ctx) => {
    return res(ctx.json(MOCK_DB.shopping));
  }),
];

export default productsHandlers;
