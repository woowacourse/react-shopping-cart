import { rest } from 'msw';
import { productList } from 'assets/mock';
import { API_PATH } from 'constants/path';

let cartList = [];

let orderList = [];

export const handlers = [
  rest.get(API_PATH.PRODUCT_LIST, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productList));
  }),

  rest.get(API_PATH.PRODUCT_LIST_ID, (req, res, ctx) => {
    const { id } = req.params;
    const product = productList.find((product) => product.id === +id);
    return res(ctx.status(200), ctx.json(product));
  }),

  rest.post(API_PATH.CART_LIST, (req, res, ctx) => {
    const newSimpleProduct = req.body;
    const isExists =
      cartList.findIndex(({ id }) => id === newSimpleProduct.id) !== -1;
    if (isExists) {
      cartList = cartList.map((product) =>
        product.id === newSimpleProduct.id
          ? { ...product, cartQuantity: product.cartQuantity + 1 }
          : product,
      );
    } else {
      cartList.push(newSimpleProduct);
    }
    return res(ctx.status(201));
  }),

  rest.get(API_PATH.CART_LIST, (req, res, ctx) => {
    const result = cartList.map((simpleProduct) => {
      const newFullProduct = productList.find(
        (product) => product.id === +simpleProduct.id,
      );
      newFullProduct.cartQuantity = simpleProduct.cartQuantity;
      return newFullProduct;
    });
    return res(ctx.status(200), ctx.json(result));
  }),

  rest.delete(API_PATH.CART_LIST, (req, res, ctx) => {
    cartList = cartList.filter((item) => +item.id !== +req.body.id);
    return res(ctx.status(200));
  }),

  rest.patch(API_PATH.CART_LIST_ID, (req, res, ctx) => {
    const itemId = req.body.itemId;
    const updatedCartQuantity = req.body.cartQuantity;
    cartList = cartList.map((product) =>
      +product.id === +itemId
        ? { ...product, cartQuantity: updatedCartQuantity }
        : product,
    );
    return res(ctx.status(200));
  }),

  rest.post(API_PATH.ORDER_LIST, (req, res, ctx) => {
    orderList = req.body;
    return res(ctx.status(201));
  }),

  rest.get(API_PATH.ORDER_LIST, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(orderList));
  }),
];
