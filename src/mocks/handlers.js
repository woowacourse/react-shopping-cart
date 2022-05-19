import { rest } from "msw";

import db from "./db.json";
import { BASE_SERVER_URL, SERVER_PATH } from "../constants";

export const prouctsHandlers = [
  rest.get(`${BASE_SERVER_URL}${SERVER_PATH.PRODUCT_LIST}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(db.products));
  }),
  rest.get(
    `${BASE_SERVER_URL}${SERVER_PATH.PRODUCT_LIST}/:id`,
    (req, res, ctx) => {
      const { id } = req.params;
      const productList = db.products;
      const selectedProduct = productList.find(
        (product) => product.id === Number(id)
      );

      if (!selectedProduct) return res(ctx.status(404), ctx.json({}));
      return res(ctx.status(200), ctx.json(selectedProduct));
    }
  ),
];

export const cartsHandlers = [
  rest.get(`${BASE_SERVER_URL}${SERVER_PATH.CART_LIST}`, (req, res, ctx) => {
    const idList = req.url.searchParams.get("idList");
    if (!idList) return res(ctx.status(400), ctx.json({}));

    const productList = db.products;
    const cartList = productList.filter((product) =>
      idList.split(",").includes(product.id.toString())
    );
    return res(ctx.status(200), ctx.json(cartList));
  }),
  rest.get(
    `${BASE_SERVER_URL}${SERVER_PATH.CART_LIST}/:id`,
    (req, res, ctx) => {
      const { id } = req.params;
      const productList = db.products;
      const selectedProduct = productList.find(
        (product) => product.id === Number(id)
      );

      if (!selectedProduct) return res(ctx.status(404), ctx.json({}));
      return res(ctx.status(200), ctx.json(selectedProduct));
    }
  ),
];
