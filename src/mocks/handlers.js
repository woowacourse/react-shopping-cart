import { rest } from "msw";

import mockData from "./mockData.json";
import { API_SERVER } from "../constants";

const { BASE_URL, PATH } = API_SERVER;

const productListUrl = `${BASE_URL}${PATH.PRODUCTS}`;
const productDetailUrl = `${BASE_URL}${PATH.PRODUCTS}/:productId`;
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

    if (!product) {
      return res(ctx.status(404));
    }

    return res(ctx.json(product));
  }),

  rest.get(cartUrl, (req, res, ctx) => {
    const cartItemList = mockData.cart
      .map((cartItem) => {
        const detailCartItem = mockData.products.find(
          (product) => product.id === Number(cartItem.id)
        );

        if (!detailCartItem) return undefined;
        return { ...detailCartItem, quantity: cartItem.quantity };
      })
      .filter((detailCartItem) => detailCartItem !== undefined);

    return res(ctx.json(cartItemList));
  }),

  rest.post(cartUrl, (req, res, ctx) => {
    const { productList } = JSON.parse(req.body);

    const newCart = [...mockData.cart];
    productList.forEach((product) => {
      const cartItemIndex = mockData.cart.findIndex(
        (cartItem) => cartItem.id === product.id
      );

      if (cartItemIndex === -1) {
        newCart.push(product);
        return;
      }

      newCart.splice(cartItemIndex, 1, product);
    });
    mockData.cart = newCart;

    const detailCartItemList = mockData.cart
      .map((cartItem) => {
        const detailCartItem = mockData.products.find(
          (product) => product.id === Number(cartItem.id)
        );

        if (!detailCartItem) return undefined;
        return { ...detailCartItem, quantity: cartItem.quantity };
      })
      .filter((detailCartItem) => detailCartItem !== undefined);

    return res(ctx.json(detailCartItemList));
  }),

  rest.delete(cartUrl, (req, res, ctx) => {
    const { productIdList: productIdListToDelete } = JSON.parse(req.body);

    const cartItemList = mockData.cart.filter((cartItem) => {
      return !productIdListToDelete.includes(cartItem.id);
    });
    mockData.cart = cartItemList;

    const detailCartItemList = cartItemList
      .map((cartItem) => {
        const detailCartItem = mockData.products.find(
          (product) => product.id === Number(cartItem.id)
        );

        if (!detailCartItem) return undefined;
        return { ...detailCartItem, quantity: cartItem.quantity };
      })
      .filter((detailCartItem) => detailCartItem !== undefined);

    return res(ctx.json(detailCartItemList));
  }),
];
