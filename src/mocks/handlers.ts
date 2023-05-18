import { rest } from 'msw';
import products from '../data/productList.json';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import { LOCAL_STORAGE_KEY } from '../constants';
import { CartItem } from '../types';

export const handlers = [
  /* 상품(Products) */
  // 상품 목록 조회
  rest.get('/products', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),

  // 상품 조회
  rest.get('products/:productId', (req, res, ctx) => {
    const { productId } = req.params;
    const targetProduct = products.find((product) => product.id === Number(productId));

    return res(ctx.status(200), ctx.json(targetProduct));
  }),

  // 상품 추가
  rest.post('products', async (req, res, ctx) => {
    const { data } = await req.json();
    const newProductId = products.length + 1;
    const newProduct = { id: newProductId, ...data };

    products.push(newProduct);

    return res(ctx.status(201), ctx.set('Location', `/products/${newProductId}`));
  }),

  // 상품 수정
  rest.put('products/:productId', async (req, res, ctx) => {
    const { data } = await req.json();
    const { productId } = req.params;

    const targetProductIdx = products.findIndex((product) => product.id === Number(productId));

    products[targetProductIdx] = { id: products[targetProductIdx].id, ...data };

    return res(ctx.status(200));
  }),

  // 상품 삭제
  rest.delete('products/:productId', (req, res, ctx) => {
    const { productId } = req.params;

    products.filter((product) => product.id !== Number(productId));
    return res(ctx.status(204));
  }),

  /* 장바구니(Shopping Cart) */
  // 장바구니 아이템 목록 조회
  rest.get('/cart-items', (_, res, ctx) => {
    const cartItems = getLocalStorage(LOCAL_STORAGE_KEY.CART_ITEMS, []);

    return res(ctx.status(200), ctx.json(cartItems));
  }),

  // 장바구니 아이템 추가
  rest.post('/cart-items', async (req, res, ctx) => {
    const { productId } = await req.json();
    const cartItems = getLocalStorage(LOCAL_STORAGE_KEY.CART_ITEMS, []);
    const newItemId = cartItems.length + 1;

    const newItem = {
      id: newItemId,
      quantity: 1,
      product: products.find((product) => product.id === productId),
    };

    setLocalStorage(LOCAL_STORAGE_KEY.CART_ITEMS, [...cartItems, newItem]);

    return res(ctx.status(201), ctx.set('Location', `/products/${newItemId}`));
  }),

  // 장바구니 아이템 수량 변경
  rest.patch('/cart-items/:cartItemId', async (req, res, ctx) => {
    const { productId } = req.params;
    const { productQuantity } = await req.json();

    const cartItems = getLocalStorage<CartItem[]>(LOCAL_STORAGE_KEY.CART_ITEMS, []);
    const cartItemIndex = cartItems.findIndex((item) => item.product.id === Number(productId));

    cartItems[cartItemIndex].quantity = productQuantity;

    setLocalStorage(LOCAL_STORAGE_KEY.CART_ITEMS, cartItems);

    return res(ctx.status(200));
  }),

  // 장바구니 아이템 삭제
  rest.delete('/cart-items/:cartItemId', (req, res, ctx) => {
    const { productId } = req.params;
    const cartItems = getLocalStorage<CartItem[]>(LOCAL_STORAGE_KEY.CART_ITEMS, []);

    setLocalStorage(
      LOCAL_STORAGE_KEY.CART_ITEMS,
      cartItems.filter((item) => item.product.id !== Number(productId))
    );
    return res(ctx.status(204));
  }),
];
