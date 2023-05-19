import { rest } from 'msw';
import { CART_ITEMS_BASE_URL, LOCAL_STORAGE_CARTLIST_KEY, PRODUCTS_BASE_URL } from '../../constant';
import type { CartItem } from '../../types/types';

const localStorageCartListData = localStorage.getItem(LOCAL_STORAGE_CARTLIST_KEY);
// eslint-disable-next-line prefer-const
let cartList: CartItem[] = localStorageCartListData ? JSON.parse(localStorageCartListData) : [];

const isInCartList = (id: number) => cartList.some((cartItem) => cartItem.id === id);

export const cartListHandlers = [
  rest.get(CART_ITEMS_BASE_URL, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(cartList));
  }),

  rest.post(CART_ITEMS_BASE_URL, async (req, res, ctx) => {
    const productId = Number(await req.text());

    if (isInCartList(productId)) {
      return res(ctx.status(409), ctx.json({ message: '장바구니에 이미 존재하는 상품.' }));
    }

    const product = await fetch(`${PRODUCTS_BASE_URL}/${productId}`).then((response) =>
      response.json(),
    );

    cartList = [
      ...cartList,
      {
        id: productId,
        quantity: 1,
        product: { ...product },
      },
    ];

    localStorage.setItem(LOCAL_STORAGE_CARTLIST_KEY, JSON.stringify(cartList));
    return res((ctx.status(201), ctx.set('Location', `/cart-items/${productId}`)));
  }),

  rest.patch(`${CART_ITEMS_BASE_URL}/:id`, async (req, res, ctx) => {
    const productId = Number(req.params.id);

    if (!isInCartList(productId)) {
      return res((ctx.status(404), ctx.json({ message: '장바구니에 존재하지 않는 상품 입니다.' })));
    }

    const quantity = Number(await req.text());

    cartList = cartList.map((cartItem) => {
      if (cartItem.id !== productId) return cartItem;

      return { ...cartItem, quantity };
    });

    localStorage.setItem(LOCAL_STORAGE_CARTLIST_KEY, JSON.stringify(cartList));
    return res(ctx.status(200));
  }),
];
