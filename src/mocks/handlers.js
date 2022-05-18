import { rest } from "msw";

import mockData from "./mockData.json";
import { API_SERVER } from "../constants";

const { BASE_URL, PATH } = API_SERVER;

const productListUrl = `${BASE_URL}${PATH.PRODUCT_LIST}`;
const productDetailUrl = `${BASE_URL}${PATH.PRODUCT_LIST}/:productId`;
const cartUrl = `${BASE_URL}${PATH.CART}`;

export const handlers = [
  rest.get(productListUrl, (req, res, ctx) => {
    return res(ctx.json(mockData.products));
  }),

  rest.get(productDetailUrl, (req, res, ctx) => {
    const { productId } = req.params;

    const product = mockData.products.find(
      (product) => product.id === Number(productId)
    );

    return res(ctx.json(product));
  }),

  rest.get(cartUrl, (req, res, ctx) => {
    const cartItemList = mockData.cart.map((cartItem) => {
      const cartItemDetail = mockData.products.find(
        (product) => product.id === Number(cartItem.id)
      );
      return { ...cartItemDetail, quantity: cartItem.quantity };
    });

    return res(ctx.json(cartItemList));
  }),
];
