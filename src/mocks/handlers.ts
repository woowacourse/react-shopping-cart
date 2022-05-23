import { rest } from "msw";

import mockData from "./mockData.json";
import { API_URL } from "constants/constants";

export const handlers = [
  rest.get(API_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData.productList));
  }),
];
