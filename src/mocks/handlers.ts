import { rest } from 'msw';
import { cartItems, products } from './mockData';
import { CartItem } from '../types';

import { CART_BASE_URL, PRODUCT_BASE_URL } from '../constants/url';
import { setDataInLocalStorage } from '../utils/localStorage';
import { CART_ITEM_INDEX } from '../constants';

export const handlers = [
  // 상품 조회
  rest.get(PRODUCT_BASE_URL, (req, res, ctx) =>
    res(ctx.delay(1000), ctx.status(200), ctx.json(products)),
  ),

  // 장바구니 아이템 목록 조회
  rest.get(CART_BASE_URL, (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(cartItems));
  }),

  // 장바구니 아이템 추가
  rest.post(CART_BASE_URL, async (req, res, ctx) => {
    const { id } = await req.json();

    const item = {
      id: id,
      quantity: 1,
    };
    return res(ctx.status(201), ctx.json(item));
  }),

  // 장바구니 아이템 수량 변경
  rest.patch<CartItem>(`${CART_BASE_URL}/:id`, async (req, res, ctx) => {
    const { id, quantity } = await req.json();
    const cartItemIndex = cartItems.findIndex((item) => item.id === id);

    const updatedItem = {
      id,
      quantity,
      product: products.find((item) => item.id === id)!,
    };

    const updatedCart =
      cartItemIndex >= CART_ITEM_INDEX
        ? cartItems.map((item, index) => (index === cartItemIndex ? updatedItem : item))
        : [...cartItems, updatedItem];

    setDataInLocalStorage<CartItem[]>('cart', updatedCart);

    const item = {
      id: id,
      quantity: quantity,
    };

    return res(ctx.status(200), ctx.json(item));
  }),

  // 장바구니 아이템 삭제
  rest.delete(`${CART_BASE_URL}/:id`, async (req, res, ctx) => {
    const { id } = await req.json();
    const updatedCart = cartItems.filter((item) => item.id !== id);

    setDataInLocalStorage<CartItem[]>('cart', updatedCart);

    return res(ctx.status(204));
  }),
];
