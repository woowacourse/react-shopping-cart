import { rest } from "msw";

import { API_URL } from "constants/constants";

import mockData from "./mockData.json";

export const handlers = [
  rest.get(API_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData.productList));
  }),
];
