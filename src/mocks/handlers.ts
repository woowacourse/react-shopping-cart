import { rest } from 'msw';
import products from './data/products.json';
import { STORAGE_ID, setStoredCartProducts } from '../utils/localStorage';
import { findTargetProduct } from '../utils/cartProduct';

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json(products));
  }),

  rest.get('/products/empty', (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json([]));
  }),

  rest.get('/products/error', (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(400), ctx.json(products));
  }),

  rest.post<{ productId: number }>('/cart-items', (req, res, ctx) => {
    const { productId } = req.body;

    const storedCartProducts = JSON.parse(
      localStorage.getItem(STORAGE_ID) ?? '[]'
    );

    if (findTargetProduct(storedCartProducts, productId)) {
      return res(ctx.status(304), ctx.json({ message: 'Already in the Cart' }));
    }

    const product = products.find((product) => product.id === productId);

    if (!product)
      return res(ctx.status(404), ctx.json({ message: '상품이 없습니다' }));

    setStoredCartProducts([
      ...storedCartProducts,
      { id: productId, quantity: 1, product },
    ]);

    return res(ctx.status(201), ctx.json({ message: 'Success to Create' }));
  }),

  rest.get('/cart-items', (req, res, ctx) => {
    return res(
      ctx.delay(200),
      ctx.status(200),
      ctx.json(JSON.parse(localStorage.getItem(STORAGE_ID) ?? '[]'))
    );
  }),
];
