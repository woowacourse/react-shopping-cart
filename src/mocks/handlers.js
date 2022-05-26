import { rest } from 'msw';
import db from '../db.json';

export const handlers = [
  rest.get(`${process.env.REACT_APP_BASE_URL}/productList`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(db));
  }),
  rest.get(`${process.env.REACT_APP_BASE_URL}/productList/:id`, (req, res, ctx) => {
    const { id: targetId } = req.params;
    const productList = db.productList;
    const product = productList.find((product) => product.id === Number(targetId));
    return res(ctx.status(200), ctx.json(product));
  }),

  rest.post(`${process.env.REACT_APP_BASE_URL}/cartList`, (req, res, ctx) => {
    db.cartList = req.body;
    return res(ctx.status(200));
  }),
  rest.get(`${process.env.REACT_APP_BASE_URL}/cartList`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(db));
  }),
  rest.get(`${process.env.REACT_APP_BASE_URL}/productInfoList`, (req, res, ctx) => {
    const cartList = db.cartList;
    const productList = db.productList;
    const infoList = cartList.map((item) => {
      const product = productList.find((product) => Number(product.id) === Number(item.id));
      const newObj = {
        id: product.id,
        thumbnail: product.thumbnail,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      };
      return newObj;
    });
    return res(ctx.status(200), ctx.json(infoList));
  }),
];
