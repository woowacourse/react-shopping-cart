import { rest } from "msw";

import mockData from "./mockData.json";
import { API_SERVER } from "../constants";

const { BASE_URL, PATH } = API_SERVER;

const productListUrl = `${BASE_URL}${PATH.PRODUCT_LIST}`;
const productDetailUrl = `${BASE_URL}${PATH.PRODUCT_LIST}/:productId`;

export const handlers = [
  rest.get(productListUrl, (req, res, ctx) => {
    return res(ctx.json(mockData.products));
  }),

  rest.get(productDetailUrl, (req, res, ctx) => {
    const { productId } = req.params;
    return res(
      ctx.json(
        mockData.products.find((product) => product.id === Number(productId))
      )
    );
  }),
];
