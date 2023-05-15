import { rest } from 'msw';

import { CART_LIST_LOCAL_STORAGE_KEY } from '../constants';
import productListData from '../data/mockData.json';
import { CartItemData } from '../types';
import { getFromLocalStorage } from '../utils/localStorage';

const handlers = [
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json(productListData));
  }),

  rest.get('/api/carts', (req, res, ctx) => {
    const cartList = getFromLocalStorage<CartItemData>(CART_LIST_LOCAL_STORAGE_KEY);

    return res(ctx.delay(2000), ctx.status(200), ctx.json(cartList));
  }),
];

export { handlers };
