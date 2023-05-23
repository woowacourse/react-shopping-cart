import { rest } from 'msw';
import mockProducts from '../data/mockProducts.json';

const products = mockProducts;

export const productHandlers = [
  // 상품 목록 조회
  rest.get('api/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),

  // 상품 추가
  rest.post('api/products', (req, res, ctx) => {
    const productId = Date.now();
    const location = `api/products/${productId}`;

    return res(ctx.status(201), ctx.json({ location }));
  }),

  // 상품 조회
  rest.get('api/products/:productId', (req, res, ctx) => {
    const { productId } = req.params;
    const product = mockProducts.find(({ id }) => id === Number(productId));

    if (!product) return res(ctx.status(400));

    return res(ctx.status(200), ctx.json(product));
  }),

  // 상품 수정
  rest.put('api/products/:productId', (req, res, ctx) => {
    const { productId } = req.params;
    const product = mockProducts.find(({ id }) => id === Number(productId));

    if (!product) return res(ctx.status(400));

    return res(ctx.status(200));
  }),

  // 상품 삭제
  rest.delete('api/products/:productId', (req, res, ctx) => {
    const { productId } = req.params;
    const product = mockProducts.find(({ id }) => id === Number(productId));

    if (!product) return res(ctx.status(400));

    return res(ctx.status(204));
  }),
];

export const cartHandlers = [
  // 장바구니 아이템 목록 조회
  rest.get('api/cart-items', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json());
  }),

  // 장바구니 아이템 추가
  rest.post('api/cart-items', (req, res, ctx) => {
    return res(ctx.status(201));
  }),

  // 장바구니 아이템 삭제
  rest.delete('api/cart-items', (req, res, ctx) => {
    return res(ctx.status(204));
  }),

  // 장바구니 아이템 수량 변경
  rest.patch('api/cart-items/:cartItemId', async (req, res, ctx) => {
    const { quantity } = await req.json();

    // NOTE: 명세 응답에는 status밖에 없음
    // 서버와 sync를 맞추려면 서버에서 응답으로 quantity를 보내주고 받은 quantity로 상태에 set해줘야 하지 않을까?
    return res(ctx.status(200), ctx.json({ quantity }));
  }),
];
