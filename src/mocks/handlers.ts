import { BASE_URL } from 'apis';
import type { PathParams } from 'msw';
import { rest } from 'msw';
import { CartItem, Item } from 'types/domain';

import { cartList, itemList } from './data';

export const handlers = [
  rest.get<null, null, Item[]>(`${BASE_URL}/itemList`, (req, res, ctx) => {
    const page = req.url.searchParams.get('_page');
    const limit = req.url.searchParams.get('_limit');

    if (page && limit) {
      return res(ctx.status(200), ctx.json(itemList.slice(0, 12)));
    }

    return res(ctx.status(200), ctx.json(itemList));
  }),

  rest.get<null, PathParams, Item>(`${BASE_URL}/itemList/:id`, (req, res, ctx) => {
    const { id } = req.params;

    return res(ctx.status(200), ctx.json(itemList[Number(id) - 1]));
  }),

  rest.get<null, null, CartItem[]>(`${BASE_URL}/cartList`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cartList));
  }),

  rest.post<Item, null, Item>(`${BASE_URL}/cartList`, (req, res, ctx) => {
    const item = req.body;

    return res(ctx.status(200), ctx.json(item));
  }),

  rest.put<CartItem, null, CartItem>(`${BASE_URL}/cartList/:id`, (req, res, ctx) => {
    const item = req.body;

    return res(ctx.status(200), ctx.json(item));
  }),

  rest.patch<{ isSelected: boolean }, PathParams, CartItem>(
    `${BASE_URL}/cartList/:id`,
    (req, res, ctx) => {
      const { id } = req.params;
      const body = req.body;
      const item = cartList.find(cart => cart.id === Number(id));

      return res(ctx.status(200), ctx.json({ ...item, ...body }));
    }
  ),

  rest.delete<null, PathParams, null>(`${BASE_URL}/cartList/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
