import { rest } from 'msw';

import { API_ENDPOINT } from '../../constants/api';
import {
  addCartItemQuantity,
  getCartData,
  removeCartItem,
  setCartData,
  updateCartItemQuantity,
} from '../../domain/cart';
import { CartItemData, PostCartItemRequestBody } from '../../types';
import { PatchCartItemRequestBody } from '../../types/api';

const cartHandlers = [
  rest.get(API_ENDPOINT.CART_GET, (req, res, ctx) => {
    const cartList = getCartData();

    return res(ctx.delay(2000), ctx.status(200), ctx.json<CartItemData[]>(cartList));
  }),

  rest.post(API_ENDPOINT.CART_POST, async (req, res, ctx) => {
    const { productId, quantity } = await req.json<PostCartItemRequestBody>();
    const currentCartData = getCartData();

    const newCartList = addCartItemQuantity(currentCartData, productId, quantity);
    setCartData(newCartList);

    return res(ctx.delay(300), ctx.status(200), ctx.json<CartItemData[]>(newCartList));
  }),

  rest.patch(`${API_ENDPOINT.CART_PATCH}/:productId`, async (req, res, ctx) => {
    const { productId } = req.params;
    const { quantity } = await req.json<PatchCartItemRequestBody>();
    const currentCartData = getCartData();

    const newCartList = updateCartItemQuantity(currentCartData, Number(productId), quantity);
    setCartData(newCartList);

    return res(ctx.delay(300), ctx.status(200), ctx.json<CartItemData[]>(newCartList));
  }),

  rest.delete(`${API_ENDPOINT.CART_DELETE}/:productId`, (req, res, ctx) => {
    const { productId } = req.params;
    const currentCartData = getCartData();

    if (currentCartData.length === 0) {
      return res(ctx.status(404));
    }

    const newCartList = removeCartItem(currentCartData, Number(productId));
    setCartData(newCartList);

    return res(ctx.delay(300), ctx.status(204));
  }),
];

export { cartHandlers };
