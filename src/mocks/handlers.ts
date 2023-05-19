import { rest } from 'msw';
import products from './data/products.json';
import {
  STORAGE_ID,
  getStoredCartProducts,
  setStoredCartProducts,
} from '../utils/localStorage';
import { findTargetProduct } from '../utils/cartProduct';
import type { CartProduct } from '../types/product';

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json(products));
  }),

  rest.get('/products/empty', (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json([]));
  }),

  rest.get('/products/error', (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(400), ctx.json(products));
  }),

  rest.get('/cart-items', (req, res, ctx) => {
    return res(
      ctx.delay(200),
      ctx.status(200),
      ctx.json(JSON.parse(localStorage.getItem(STORAGE_ID) ?? '[]'))
    );
  }),

  rest.post<{ productId: number }>('/cart-items', (req, res, ctx) => {
    const { productId } = req.body;

    const storedCartProducts = getStoredCartProducts();

    if (findTargetProduct(storedCartProducts, productId)) {
      return res(
        ctx.status(304),
        ctx.json({ message: '이미 상품이 있습니다' })
      );
    }

    const product = products.find((product) => product.id === productId);

    if (!product)
      return res(ctx.status(404), ctx.json({ message: '상품이 없습니다' }));

    setStoredCartProducts([
      ...storedCartProducts,
      { id: productId, quantity: 1, product },
    ]);

    return res(ctx.status(201), ctx.json({ message: '상품이 추가되었습니다' }));
  }),

  rest.patch<{ quantity: number }>(
    '/cart-items/:cartItemId',
    (req, res, ctx) => {
      const { cartItemId } = req.params;
      const { quantity } = req.body;

      const cartProductId = Number(cartItemId as string);

      const storedCartProducts: CartProduct[] = getStoredCartProducts();

      if (
        !storedCartProducts.find(
          (cartProduct) => cartProduct.id === cartProductId
        )
      ) {
        return res(
          ctx.status(304),
          ctx.json({ message: '카트에 상품이 없습니다' })
        );
      }

      setStoredCartProducts(
        storedCartProducts.map((cartProduct) => {
          if (cartProduct.id === cartProductId) {
            return { ...cartProduct, quantity };
          }
          return cartProduct;
        })
      );

      return res(
        ctx.delay(200),
        ctx.status(200),
        ctx.json({ message: '업데이트가 완료되었습니다' })
      );
    }
  ),

  rest.delete('/cart-items/:cartItemId', (req, res, ctx) => {
    const { cartItemId } = req.params;

    const cartProductId = Number(cartItemId as string);

    const storedCartProducts: CartProduct[] = getStoredCartProducts();

    if (
      !storedCartProducts.find(
        (cartProduct) => cartProduct.id === cartProductId
      )
    ) {
      return res(
        ctx.status(304),
        ctx.json({ message: '카트에 상품이 없습니다' })
      );
    }

    setStoredCartProducts(
      storedCartProducts.filter(
        (cartProduct) => cartProduct.id !== cartProductId
      )
    );

    return res(ctx.delay(200), ctx.status(204));
  }),
];
