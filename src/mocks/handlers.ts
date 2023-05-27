import type { CartItemType, ProductType } from '../types';

import { rest } from 'msw';

import mockProduct from './mockProducts.json';
import { API_URL } from '../constants/api';
import { LOCAL_STORAGE_KEY } from '../constants';
import { getData, updateData } from '../utils/localStorage';

let products: ProductType[] = mockProduct;

interface AddCartItemRequest {
  body: {
    productId: number;
  };
}

interface UpdateQuantityRequest {
  params: {
    cartItemId: string;
  };
  body: {
    quantity: number;
  };
}

interface DeleteCartItemRequest {
  params: {
    cartItemId: string;
  };
}

export const handlers = [
  rest.get(API_URL.PRODUCT, (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(products));
  }),

  rest.get(API_URL.CART, (req, res, ctx) => {
    return res(ctx.delay(500), ctx.status(200), ctx.json(getData(LOCAL_STORAGE_KEY.CART)));
  }),

  rest.post(API_URL.CART, (req: AddCartItemRequest, res, ctx) => {
    const product = products.find((product) => product.id === req.body.productId);

    if (product) {
      const currentCart: CartItemType[] = getData(LOCAL_STORAGE_KEY.CART);
      const newCartItem: CartItemType = { id: Date.now(), quantity: 1, product };
      updateData(LOCAL_STORAGE_KEY.CART, [...currentCart, newCartItem]);

      return res(ctx.delay(100), ctx.status(201), ctx.json(newCartItem));
    }
    return res(
      ctx.status(400),
      ctx.json({ errorMessage: `요청한 상품 Id ${req.body.productId}가 존재하지 않아요` })
    );
  }),

  rest.patch(`${API_URL.CART}/:cartItemId`, (req: UpdateQuantityRequest, res, ctx) => {
    const currentCart: CartItemType[] = getData(LOCAL_STORAGE_KEY.CART);
    const cartItemIndex = currentCart.findIndex(
      (item) => item.id === Number(req.params.cartItemId)
    );

    if (cartItemIndex === undefined)
      return res(
        ctx.status(400),
        ctx.json({
          errorMessage: `요청한 장바구니 상품 Id ${req.params.cartItemId}가 존재하지 않아요`,
        })
      );

    const newCart = [...currentCart];
    newCart.splice(cartItemIndex, 1, {
      ...currentCart[cartItemIndex],
      quantity: req.body.quantity,
    });
    updateData(LOCAL_STORAGE_KEY.CART, newCart);

    return res(ctx.delay(100), ctx.status(200));
  }),

  rest.delete(`${API_URL.CART}/:cartItemId`, (req: DeleteCartItemRequest, res, ctx) => {
    const currentCart: CartItemType[] = getData(LOCAL_STORAGE_KEY.CART);
    const cartItemIndex = currentCart.findIndex(
      (item) => item.id === Number(req.params.cartItemId)
    );

    if (cartItemIndex === undefined)
      return res(
        ctx.status(400),
        ctx.json({
          errorMessage: `요청한 장바구니 상품 Id ${req.params.cartItemId}가 존재하지 않아요`,
        })
      );

    const newCart = currentCart.filter((item) => item.id !== Number(req.params.cartItemId));
    updateData(LOCAL_STORAGE_KEY.CART, newCart);

    return res(ctx.delay(100), ctx.status(204));
  }),
];
