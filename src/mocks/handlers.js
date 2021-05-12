import { rest } from 'msw';
import { API_BASE_URL } from '../constants/API';
import {
  CART_ITEM_LIST_MOCK,
  ORDER_LIST_MOCK,
  PRODUCT_LIST_MOCK,
  ORDER_CONFIRM_ITEM_LIST_MOCK,
} from './mockData';

let cartItemList = CART_ITEM_LIST_MOCK;
let orderList = ORDER_LIST_MOCK;
let orderConfirmItemList = ORDER_CONFIRM_ITEM_LIST_MOCK;

export const handlers = [
  rest.get(API_BASE_URL + '/productList', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(PRODUCT_LIST_MOCK));
  }),

  rest.get(API_BASE_URL + '/cart', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cartItemList));
  }),

  rest.delete(API_BASE_URL + '/cart/:id', (req, res, ctx) => {
    const { id } = req.params;

    cartItemList = cartItemList.filter((item) => item.id !== id);

    return res(ctx.status(200));
  }),

  rest.put(API_BASE_URL + '/cart/:id?', (req, res, ctx) => {
    const { id } = req.params;

    if (cartItemList.every((item) => item.id !== id)) {
      return res(ctx.status(404), ctx.json(req.body));
    }

    cartItemList = cartItemList.map((item) => (item.id === id ? req.body : item));

    return res(ctx.status(200), ctx.json(req.body));
  }),

  rest.get(API_BASE_URL + '/order', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(orderList));
  }),

  rest.get(API_BASE_URL + '/orderConfirm', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(orderConfirmItemList));
  }),
];
