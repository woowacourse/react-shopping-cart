import { rest } from 'msw';

import initialData from '../data/mockData.json';

interface PostCartItemId {
  itemId: string;
}

const STORE_CART_DATA =
  '[{"id":1685089181564,"product":{"id":7,"name":"쌈채소봉투(소)-신선한 채소","price":31400,"imageUrl":"https://cdn-mart.baemin.com/sellergoods/list/ae81ed95-331c-4a73-aba9-9d47e8729624.jpg?h=400&w=400"},"quantity":2,"isChecked":true},{"id":1685090063783,"product":{"id":9,"name":"[박스/무료배송] 쉐프원 냉동 중화면 1.15kg *8개입","price":18320,"imageUrl":"https://cdn-mart.baemin.com/sellergoods/main/7018d2ee-e0c3-43e5-aa45-bd5d98c65f64.jpg?h=400&w=400"},"quantity":1,"isChecked":true}]';

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1500), ctx.json(initialData));
  }),

  rest.get('/products-failed', (req, res, ctx) => {
    return res(ctx.status(500), ctx.delay(1500));
  }),

  rest.get('/cart-items', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(JSON.parse(STORE_CART_DATA)));
  }),

  rest.get('/cart-items-failed', (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.delay(1000),
      ctx.json([{ error: '카트 목록이 존재하지 않습니다.' }])
    );
  }),

  rest.patch<PostCartItemId>('/cart-items/:cartItemId', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(500));
  }),

  rest.patch<PostCartItemId>('/cart-items-failed/:cartItemId', async (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.delay(500),
      ctx.json({ message: '장바구니에 존재하지 않는 상품입니다.' })
    );
  }),

  rest.delete('/cart-items/:id', async (req, res, ctx) => {
    return res(ctx.status(204), ctx.delay(500));
  }),

  rest.delete('/cart-items-failed/:id', async (req, res, ctx) => {
    return res(ctx.status(500), ctx.delay(500));
  }),

  rest.post('/cart-items', async (req, res, ctx) => {
    return res(ctx.status(201), ctx.delay(500));
  }),

  rest.post('/cart-items-failed', async (req, res, ctx) => {
    return res(ctx.status(500), ctx.delay(500));
  }),

  rest.post('/cart-items-quantity', async (req, res, ctx) => {
    return res(ctx.status(201), ctx.delay(500));
  }),

  rest.post('/cart-items-quantity-failed', async (req, res, ctx) => {
    return res(ctx.status(500), ctx.delay(500));
  }),
];
