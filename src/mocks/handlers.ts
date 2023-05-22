import { PRODUCT_LIST } from '@mockData/productList';
import { rest } from 'msw';
import { CartInformation, ProductInformation } from '@type/types';
import {
  changedQuantityCart,
  createCartItem,
  removedItemCart,
} from '@utils/cart';
import { fetchGet } from '@utils/fetch';
import {
  API_URL_CART_LIST,
  API_URL_PRODUCT_LIST,
  CART_LIST_LOCAL_KEY,
} from '@constants/common';

export interface RequestCartParams {
  productId?: number;
  quantity?: number;
}

let receivedData: CartInformation[] = JSON.parse(
  localStorage.getItem(CART_LIST_LOCAL_KEY) || '[]'
);

export const handlers = [
  rest.get(API_URL_PRODUCT_LIST, (req, res, ctx) => {
    return res(
      ctx.set('Content-Type', 'application/json'),
      ctx.status(200),
      ctx.json(PRODUCT_LIST.productList),
      ctx.delay(1200)
    );
  }),

  rest.get(`${API_URL_PRODUCT_LIST}/:productId`, async (req, res, ctx) => {
    const { productId } = req.params;

    const data = PRODUCT_LIST.productList.find(
      (product) => product.id === Number(productId.toString())
    );

    return res(
      ctx.set('Content-Type', 'application/json'),
      ctx.status(200),
      ctx.json(data),
      ctx.text('OK')
    );
  }),

  rest.get(API_URL_CART_LIST, (req, res, ctx) => {
    return res(
      ctx.set('Content-Type', 'application/json'),
      ctx.status(200),
      ctx.json(receivedData),
      ctx.delay(100),
      ctx.text('OK')
    );
  }),

  rest.post(API_URL_CART_LIST, async (req, res, ctx) => {
    try {
      const { productId }: RequestCartParams = await req.json();

      if (!productId) {
        console.error('요청한 값이 올바르지 않습니다.');
        return res(ctx.status(400), ctx.text('잘못된 요청입니다.'));
      }

      const product = await fetchGet<ProductInformation>(
        `${API_URL_PRODUCT_LIST}/${productId}`
      );

      if (!product) {
        console.error('요청한 값이 올바르지 않습니다.');
        return res(ctx.status(400), ctx.text('잘못된 요청입니다.'));
      }

      receivedData.push(createCartItem(product));

      return res(
        ctx.set('Content-Type', 'application/json'),
        ctx.status(201),
        ctx.json('Created')
      );
    } catch (error) {
      console.error('잘못된 JSON', error);
      return res(ctx.status(400), ctx.text('잘못된 요청입니다.'));
    }
  }),

  rest.patch(`${API_URL_CART_LIST}/:cartItemId`, async (req, res, ctx) => {
    const { cartItemId } = req.params;
    const { quantity }: RequestCartParams = await req.json();

    const cartItem = receivedData.find(
      (item) => item.id === Number(cartItemId)
    );

    if (!cartItem) {
      console.error('요청한 값이 올바르지 않습니다.');
      return res(ctx.status(400), ctx.text('잘못된 요청입니다.'));
    }

    const updated = changedQuantityCart({
      cart: receivedData,
      id: Number(cartItemId),
      quantity: Number(quantity),
    });

    receivedData = updated;

    return res(ctx.status(200), ctx.text('OK'));
  }),

  rest.delete(`${API_URL_CART_LIST}/:cartItemId`, (req, res, ctx) => {
    const { cartItemId } = req.params;

    const cartItem = receivedData.find(
      (item) => item.id === Number(cartItemId)
    );

    if (!cartItem) {
      console.error('요청한 값이 올바르지 않습니다.');
      return res(ctx.status(400), ctx.text('잘못된 요청입니다.'));
    }

    const removed = removedItemCart(receivedData, Number(cartItemId));

    receivedData = removed;

    return res(ctx.status(204));
  }),
];
