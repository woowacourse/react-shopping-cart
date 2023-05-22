import type { CartType, ProductType } from '../types';

import { rest } from 'msw';

import { LOCAL_STORAGE_KEY, MOCK_URL } from '../constants';
import mockProducts from './mockProducts.json';

const products: ProductType[] = mockProducts;

const getProduct = (productId: number) => {
  return products.find((product) => product.id === productId) as ProductType;
};

const getCart = (): CartType => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.cart) ?? '[]');
};

const setCart = (cart: CartType) => {
  localStorage.setItem(LOCAL_STORAGE_KEY.cart, JSON.stringify(cart));
};

export const handlers = [
  rest.get(`${MOCK_URL}/products`, (_req, res, ctx) => {
    return res(ctx.delay(400), ctx.status(200), ctx.json(products));
  }),

  rest.get(`${MOCK_URL}/cart-items`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getCart()));
  }),

  rest.post(`${MOCK_URL}/cart-items`, async (req, res, ctx) => {
    const { productId } = await req.json();
    const product = getProduct(productId);

    setCart(getCart().concat([{ id: Date.now(), quantity: 1, product }]));

    return res(ctx.status(201));
  }),

  rest.patch(`${MOCK_URL}/cart-items/:cartItemId`, async (req, res, ctx) => {
    const cartItemId = Number(req.params.cartItemId);
    const { quantity } = await req.json();

    const newCart = getCart().map((cartItem) =>
      cartItem.id === cartItemId ? { ...cartItem, quantity } : cartItem
    );

    setCart(newCart);

    return res(ctx.status(200));
  }),

  rest.delete(`${MOCK_URL}/cart-items/:cartItemId`, (req, res, ctx) => {
    const cartItemId = Number(req.params.cartItemId);
    setCart(getCart().filter(({ id }) => id !== cartItemId));

    return res(ctx.status(204));
  }),
];
