import { rest } from "msw";
import products from "./mockData.json";

export const handlers = [
  rest.get("/products", (req, res, ctx) => {
    return res(ctx.delay(400), ctx.json(products), ctx.status(200));
  }),
];
