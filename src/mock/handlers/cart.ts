import { rest } from 'msw';
import { KEY_CART } from '../../constants/index';
import { CART_URL } from '../../constants/url';
import { CartItem } from '../../types';
import {
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from '../../utils/getAndSetDataInLocalStorage';

import productList from '../productList.json';

const getProduct = (id: number) => productList.find((item) => item.id === id);

const updateLocalStorage = (updatedCart: CartItem[]) => {
  setDataInLocalStorage(KEY_CART, updatedCart);
};

export const cartHandlers = [
  // 장바구니 목록 조회
  rest.get(CART_URL, (_, res, ctx) => {
    const ItemsInCart = getDataFromLocalStorage(KEY_CART);

    return res(ctx.status(200), ctx.json(ItemsInCart));
  }),

  // 장바구니 아이템 추가
  rest.post(CART_URL, async (req, res, ctx) => {
    const { id } = await req.json();
    const ItemsInCart = getDataFromLocalStorage(KEY_CART);
    const cart: CartItem[] = ItemsInCart ? JSON.parse(ItemsInCart) : [];

    const updatedCart = [
      ...cart,
      {
        id: id,
        quantity: 1,
        product: getProduct(id)!,
      },
    ];

    updateLocalStorage(updatedCart);

    return res(ctx.status(201), ctx.set('Location', `/cart-items/${cart.at(-1)?.id}`));
  }),

  // 장바구니 아이템 수량 변경
  rest.patch(`${CART_URL}/:id`, async (req, res, ctx) => {
    const { quantity } = await req.json();
    const cartItemId = Number(req.params.id);
    const cart = JSON.parse(getDataFromLocalStorage(KEY_CART));

    const isInCart = (id: number) => cart.some((cartItem: CartItem) => cartItem.product.id === id);

    const productExists = isInCart(cartItemId);
    if (!productExists) {
      return res(
        ctx.status(404),
        ctx.json({ message: '장바구니에 해당 상품이 존재하지 않습니다.' })
      );
    }

    const updatedCart = cart.map((cartItem: CartItem) => {
      if (cartItem.id !== cartItemId) return cartItem;

      return { ...cartItem, quantity };
    });

    updateLocalStorage(updatedCart);

    return res(ctx.status(200));
  }),

  // 장바구니 아이템 삭제
  rest.delete(`${CART_URL}/:id`, async (req, res, ctx) => {
    const { id } = await req.json();
    const cart = JSON.parse(getDataFromLocalStorage(KEY_CART));
    const updatedCart = cart.filter((cartItem: CartItem) => cartItem.id !== id);

    updateLocalStorage(updatedCart);

    return res(ctx.status(204));
  }),
];
