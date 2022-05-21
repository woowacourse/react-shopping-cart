import { rest } from 'msw';
import { productList } from 'assets/mock';

let cartList = [];

let orderList = [];

export const handlers = [
  rest.get('/productList', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productList));
  }),

  rest.get('/productList/:id', (req, res, ctx) => {
    const { id } = req.params;
    const product = productList.find((product) => product.id === +id);
    return res(ctx.status(200), ctx.json(product));
  }),

  rest.post('/cartList', (req, res, ctx) => {
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

  rest.get('/cartList', (req, res, ctx) => {
    const result = cartList.map((simpleProduct) => {
      const newFullProduct = productList.find(
        (product) => product.id === +simpleProduct.id,
      );
      newFullProduct.cartQuantity = simpleProduct.cartQuantity;
      return newFullProduct;
    });
    return res(ctx.status(200), ctx.json(result));
  }),

  rest.delete('/cartList', (req, res, ctx) => {
    cartList = cartList.filter((item) => +item.id !== +req.body.id);
    return res(ctx.status(200));
  }),

  rest.patch('/cartList/:id', (req, res, ctx) => {
    const itemId = req.body.itemId;
    const updatedCartQuantity = req.body.cartQuantity;
    cartList = cartList.map((product) =>
      +product.id === +itemId
        ? { ...product, cartQuantity: updatedCartQuantity }
        : product,
    );
    return res(ctx.status(200));
  }),

  rest.post('/orderList', (req, res, ctx) => {
    orderList = req.body;
    return res(ctx.status(201));
  }),

  rest.get('/orderList', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(orderList));
  }),
];
