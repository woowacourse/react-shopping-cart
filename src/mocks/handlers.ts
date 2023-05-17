import { rest } from "msw";
import products from "./mockData/products.json";
import cartItems from "./mockData/cartItems.json";

const handlers = [
  rest.get("/products", (_, res, ctx) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res(ctx.status(200), ctx.json(products)));
      }, 3000);
    });
  }),

  rest.get("/cart-items", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(cartItems));
  }),
];

export { handlers };
