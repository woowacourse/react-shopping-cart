import { rest } from 'msw';
import products from './data/products.json';
import cartProducts from './data/cartProducts.json';
import { findTargetProduct } from '../domain/cartProductHandler';

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
    return res(ctx.delay(200), ctx.status(200), ctx.json(cartProducts));
  }),

  rest.post<{ productId: number }>('/cart-items', (req, res, ctx) => {
    const { productId } = req.body;

    const storedCartProducts = cartProducts;

    if (findTargetProduct(storedCartProducts, productId)) {
      return res(
        ctx.status(304),
        ctx.json({ message: '이미 상품이 있습니다' })
      );
    }

    const product = products.find((product) => product.id === productId);

    if (!product)
      return res(ctx.status(404), ctx.json({ message: '상품이 없습니다' }));

    return res(ctx.status(201), ctx.json({ message: '상품이 추가되었습니다' }));
  }),

  rest.patch<{ quantity: number }>(
    '/cart-items/:cartItemId',
    (req, res, ctx) => {
      const { cartItemId } = req.params;

      const cartProductId = Number(cartItemId as string);

      const storedCartProducts = cartProducts;

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

    const storedCartProducts = cartProducts;

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

    return res(ctx.delay(200), ctx.status(204));
  }),
];
