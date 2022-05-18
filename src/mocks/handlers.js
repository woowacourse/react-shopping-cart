import { rest } from "msw";

import db from "./db.json";
import { BASE_SERVER_URL, PRODUCT_LIST_PATH } from "../constants";

export const handlers = [
  rest.get(`${BASE_SERVER_URL}${PRODUCT_LIST_PATH}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(db.products));
  }),
  rest.get(`${BASE_SERVER_URL}${PRODUCT_LIST_PATH}/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const productList = db.products;
    const selectedProduct = productList.find(
      (product) => product.id === Number(id)
    );

    if (!selectedProduct) return res(ctx.status(404), ctx.json({}));
    return res(ctx.status(200), ctx.json(selectedProduct));
  }),
];
