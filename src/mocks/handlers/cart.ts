import { rest } from 'msw';
import { cartProductList } from 'mocks/data';
import { CartProductData } from 'types';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

export const loadCartProduct = rest.get(`${BASE_URL}/cartProductList/:id`, (req, res, ctx) => {
  const id = Number(req.params.id);
  const cartProduct = cartProductList.find((cartProduct) => id === cartProduct.id);

  if (!cartProduct) return res(ctx.status(400));
  return res(ctx.status(200), ctx.json(cartProduct));
});

export const loadCartProductList = rest.get(`${BASE_URL}/cartProductList`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(cartProductList));
});

export const registerCartProduct = rest.post(`${BASE_URL}/cartProductList`, (req, res, ctx) => {
  const cartProduct = req.body as CartProductData;
  cartProductList.push(cartProduct);

  return res(ctx.status(201), ctx.json(cartProduct));
});

export const updateCartProduct = rest.put(`${BASE_URL}/cartProductList/:id`, (req, res, ctx) => {
  const id = Number(req.params.id);
  const cartProduct = req.body as CartProductData;

  const index = cartProductList.findIndex((cartProduct) => cartProduct.id === id);
  cartProductList.splice(index, 1, cartProduct);

  return res(ctx.status(200), ctx.json(req.body));
});

export const deleteCartProduct = rest.delete(`${BASE_URL}/cartProductList/:id`, (req, res, ctx) => {
  const id = Number(req.params.id);

  const index = cartProductList.findIndex((cartProduct) => cartProduct.id === id);
  cartProductList.splice(index, 1);

  return res(ctx.status(200));
});
