import { rest } from "msw";
import products from "./mockData.json";
import { getCart, addCartItem, setCartItem } from "mocks/server/cart";

export const handlers = [
  rest.get("/products", (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.set("Content-Type", "application/json"),
      ctx.json(products)
    );
  }),

  rest.get("/cart-items", (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.set("Content-Type", "application/json"),
      ctx.json(getCart())
    );
  }),

  rest.post("/cart-items", async (req, res, ctx) => {
    const { productId } = await req.json();

    addCartItem(productId);

    return res(ctx.delay(100), ctx.status(201), ctx.set("Location", `/cart-items/${productId})`));
  }),

  rest.patch("/cart-items/:productId", async (req, res, ctx) => {
    const { productId } = req.params;
    const { quantity } = await req.json();

    setCartItem(Number(productId), quantity);

    return res(ctx.delay(100), ctx.status(200));
  }),

  rest.delete("/cart-items/:productId", async (req, res, ctx) => {
    const { productId } = req.params;

    setCartItem(Number(productId), 0);

    return res(ctx.delay(100), ctx.status(204));
  }),
];
