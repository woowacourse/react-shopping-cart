import { rest } from 'msw';

import { CART_LIST_LOCAL_STORAGE_KEY } from '../constants';
import initialData from '../data/mockData.json';
import { CartItemType } from '../types';

interface PostCartItemId {
  itemId: string;
}

const storeKey = CART_LIST_LOCAL_STORAGE_KEY;

export const handlers = [
  rest.get('/productlist', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(2000), ctx.json(initialData));
  }),

  rest.get('/cartList', (req, res, ctx) => {
    const savedValue = localStorage.getItem(storeKey);

    if (savedValue !== null) {
      //   setSelf(JSON.parse(savedValue));
      return res(ctx.status(200), ctx.delay(2000), ctx.json(JSON.parse(savedValue)));
    }
    return res(ctx.status(200), ctx.delay(1000), ctx.json([]));
  }),

  rest.post<PostCartItemId>('/updateCartItemQuantityIncrease', async (req, res, ctx) => {
    const { itemId } = await req.json();

    const savedValue = localStorage.getItem(storeKey);
    if (savedValue) {
      const initData = JSON.parse(savedValue) as CartItemType[];
      const refreshData = initData.map((item) => {
        if (item.id !== Number(itemId)) return item;
        return {
          id: itemId,
          quantity: item.quantity + 1,
          product: item.product,
          isChecked: true,
        };
      });
      console.log(refreshData);
      return res(ctx.status(200), ctx.delay(500), ctx.json(refreshData));
    }

    return res(
      ctx.status(403),
      ctx.delay(500),
      ctx.json({ ok: false, message: '존재하지 않는 상품입니다.' })
    );
  }),

  rest.post<PostCartItemId>('/updateCartItemQuantityDecrease', async (req, res, ctx) => {
    const { itemId } = await req.json();

    const savedValue = localStorage.getItem(storeKey);
    if (savedValue) {
      const initData = JSON.parse(savedValue) as CartItemType[];
      const refreshData = initData.map((item) => {
        if (item.id !== Number(itemId)) return item;
        return {
          id: itemId,
          quantity: item.quantity - 1,
          product: item.product,
          isChecked: true,
        };
      });
      console.log(refreshData);
      return res(ctx.status(200), ctx.delay(500), ctx.json(refreshData));
    }

    return res(
      ctx.status(403),
      ctx.delay(500),
      ctx.json({ ok: false, message: '존재하지 않는 상품입니다.' })
    );
  }),
];
