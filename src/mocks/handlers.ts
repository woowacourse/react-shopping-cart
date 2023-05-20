import { rest } from 'msw';
import { products } from './mockData';
import { CartItem } from '../types';
import { CART_BASE_URL, PRODUCT_BASE_URL } from '../constants/url';
import { getLocalStorage, setDataInLocalStorage } from '../utils/localStorage';
import { CART_ITEM_INDEX } from '../constants';

const getCart = () => getLocalStorage<CartItem[]>('cart', []);

const setCart = (updatedCart: CartItem[]) => setDataInLocalStorage<CartItem[]>('cart', updatedCart);

const getProduct = (id: number) => products.find((item) => item.id === id);

export const handlers = [
  // 상품 조회
  rest.get(PRODUCT_BASE_URL, (req, res, ctx) =>
    res(ctx.delay(1000), ctx.status(200), ctx.json(products)),
  ),

  // 장바구니 아이템 목록 조회
  rest.get(CART_BASE_URL, (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(getCart()));
  }),

  // 장바구니 아이템 추가
  rest.post(CART_BASE_URL, async (req, res, ctx) => {
    const { id } = await req.json();

    if (getProduct(id) === undefined) {
      return res(ctx.status(404));
    }

    const updatedItem = {
      id,
      quantity: 1,
      product: getProduct(id)!,
    };

    const updatedCart = [...getCart(), updatedItem];

    setCart(updatedCart);

    return res(ctx.status(201), ctx.json(updatedItem));
  }),

  // 장바구니 아이템 수량 변경
  rest.patch<CartItem>(`${CART_BASE_URL}/:id`, async (req, res, ctx) => {
    const { id, quantity } = await req.json();

    const cartItemIndex = getCart().findIndex((item) => item.id === id);

    if (cartItemIndex === -1) {
      return res(ctx.status(404));
    }

    const updatedItem = {
      id,
      quantity,
      product: getProduct(id)!,
    };

    const updatedCart =
      cartItemIndex >= CART_ITEM_INDEX
        ? getCart().map((item, index) => (index === cartItemIndex ? updatedItem : item))
        : [...getCart(), updatedItem];

    setCart(updatedCart);

    const item = {
      id: id,
      quantity: quantity,
    };

    return res(ctx.status(200), ctx.json(item));
  }),

  // 장바구니 아이템 삭제
  rest.delete(`${CART_BASE_URL}/:id`, async (req, res, ctx) => {
    const { id } = await req.json();

    const updatedCart = getCart().filter((item) => item.id !== id);

    if (updatedCart === undefined) {
      return res(ctx.status(404));
    }

    setCart(updatedCart);

    return res(ctx.status(204));
  }),
];
