import { rest } from "msw";
import { Datas } from "./data";

const data = new Datas();

export const handlers = [
  rest.get("/api/products/", async (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json(data.products));
  }),

  rest.get("/api/cart-items/", async (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json(data.cartList));
  }),

  rest.post("/api/cart-items", async (req, res, ctx) => {
    const { productId } = await req.json();
    data.pushItemAtCart(productId);

    return res(ctx.status(200), ctx.json(data));
  }),

  rest.patch("/api/cart-items/*", async (req, res, ctx) => {
    if (typeof Number(req.params[0]) !== "number") return;

    const id = Number(req.params[0]);
    const { quantity } = await req.json();

    data.patchCartItemQuantity(id, quantity);

    return res(ctx.status(200), ctx.json(data));
  }),

  rest.delete("/api/cart-items/*", async (req, res, ctx) => {
    if (typeof Number(req.params[0]) !== "number") return;

    const id = Number(req.params[0]);
    data.deleteItemFromCart(id);

    return res(ctx.delay(200), ctx.status(200), ctx.json(data.cartList));
  }),
];
