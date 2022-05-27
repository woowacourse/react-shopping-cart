import { rest } from "msw";
import { productList } from "@/mocks/data";

import { BASE_URL } from "@/constants";

export const handlers = [
  rest.get(`${BASE_URL}/products`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(JSON.stringify(productList)));
  }),
];
