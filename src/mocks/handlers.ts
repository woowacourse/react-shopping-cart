// src/mocks/handlers.js
import { rest } from "msw";
import productList from "./dummyData";

export const handlers = [
  rest.get(`${process.env.REACT_APP_API_URL}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productList));
  }),
];
