import { rest } from 'msw';

import productListData from '../data/mockData.json';
import {
  addCartItemQuantity,
  getCartData,
  setCartData,
  updateCartItemQuantity,
} from '../domain/cart';
import { CartItemData, PostCartItemRequestBody, ProductItemData } from '../types';
import { PatchCartItemRequestBody } from '../types/api';

const handlers = [
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json<ProductItemData[]>(productListData));
  }),

  rest.get('/api/carts', (req, res, ctx) => {
    const cartList = getCartData();

    return res(ctx.delay(2000), ctx.status(200), ctx.json<CartItemData[]>(cartList));
  }),

  rest.post('/api/carts/add', async (req, res, ctx) => {
    const { productId, quantity } = await req.json<PostCartItemRequestBody>();
    const currentCartData = getCartData();

    const newCartList = addCartItemQuantity(currentCartData, productId, quantity);
    setCartData(newCartList);

    return res(ctx.delay(1000), ctx.status(200), ctx.json<CartItemData[]>(newCartList));
  }),

  rest.patch('/api/carts/change/:productId', async (req, res, ctx) => {
    const { productId } = req.params;
    const { quantity } = await req.json<PatchCartItemRequestBody>();
    const currentCartData = getCartData();

    const newCartList = updateCartItemQuantity(currentCartData, Number(productId), quantity);
    setCartData(newCartList);

    return res(ctx.delay(5000), ctx.status(200), ctx.json<CartItemData[]>(newCartList));
  }),
];

export { handlers };
