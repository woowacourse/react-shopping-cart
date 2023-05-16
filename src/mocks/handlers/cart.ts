import { rest } from 'msw';
import { CART_BASE_URL, PRODUCTS_BASE_URL } from '../../constants';
import { uuid } from '../../utils/uuid';
import type { CartItem } from '../../types/product';

const localStorageCartData = localStorage.getItem('cart');
// eslint-disable-next-line prefer-const
let cart: CartItem[] = localStorageCartData
  ? JSON.parse(localStorageCartData)
  : [];

const isInCart = (id: number) =>
  cart.some((cartItem) => cartItem.product.id === id);

export const cartHandlers = [
  // 장바구니 목록 조회 API
  rest.get(CART_BASE_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cart));
  }),

  // 장바구니 아이템 추가 API
  rest.post(CART_BASE_URL, async (req, res, ctx) => {
    const productId = Number(await req.text());
    const isAlreadyExists = isInCart(productId);

    if (isAlreadyExists) {
      return res(
        ctx.status(409),
        ctx.json({ message: '상품이 이미 장바구니에 존재합니다.' }),
      );
    }

    const product = await fetch(`${PRODUCTS_BASE_URL}/${productId}`).then(
      (res) => res.json(),
    );

    cart = [
      ...cart,
      {
        id: uuid(),
        quantity: 1,
        product: { ...product },
      },
    ];

    return res(
      ctx.status(201),
      ctx.set('Location', `/cart-items/${cart.at(-1)?.id}`),
    );
  }),
];
