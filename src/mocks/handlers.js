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
    const cartList = db.carts;
    const productList = db.products;

    const result = cartList.map(({ id, count }) => {
      const selectedProduct = productList.find((product) => product.id === id);
      return { ...selectedProduct, count };
    });

    return res(ctx.status(200), ctx.json(result));
  }),
  rest.post(`${BASE_SERVER_URL}${SERVER_PATH.CART_LIST}`, (req, res, ctx) => {
    const { id, count } = req.body;
    if (!id || !count) return res(ctx.status(400));

    const cartList = db.carts;
    const selectedCartsList = cartList.filter((cart) => cart.id !== id);
    db.carts = [...selectedCartsList, { id, count }];
    return res(ctx.status(200));
  }),
];
