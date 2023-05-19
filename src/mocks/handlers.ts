import { rest } from 'msw';
import products from './data/products.json';
import {
  STORAGE_ID,
  setStoredCartProducts,
  storedCartProducts,
} from '../utils/localStorage';
import { findTargetProduct } from '../utils/cartProduct';

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

    const storedCartProducts = JSON.parse(
      localStorage.getItem(STORAGE_ID) ?? '[]'
    );

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

  rest.delete('/cart-items/:cartItemId', (req, res, ctx) => {
    const { cartItemId } = req.params;

    const cartProductId = Number(cartItemId as string);

    const currentStoredCartProducts = [...storedCartProducts];

    if (
      !currentStoredCartProducts.find(
        (cartProduct) => cartProduct.id === cartProductId
      )
    ) {
      return res(
        ctx.status(304),
        ctx.json({ message: '카트에 상품이 없습니다' })
      );
    }

    setStoredCartProducts(
      currentStoredCartProducts.filter(
        (cartProduct) => cartProduct.id !== cartProductId
      )
    );

    return res(ctx.delay(200), ctx.status(204));
  }),
];
