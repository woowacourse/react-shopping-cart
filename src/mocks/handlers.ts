import { CartProduct } from './../types/product';
import mockProducts from './mockProducts.json';
import { rest } from 'msw';
import { Product } from 'types/product';

const BASE = 'api';

let products: Product[] = mockProducts;
let cart: CartProduct[] = [];

export const handlers = [
  // 상품 목록 조회
  rest.get(`${BASE}/products`, (req, res, ctx) => {
    return res(ctx.json(products));
  }),

  // 상품 조회
  rest.get(`${BASE}/products/:productId`, (req, res, ctx) => {
    const { productId } = req.params;

    const product = products.find((product) => product.id === Number(productId));

    if (!product) {
      return res(
        ctx.status(404),
        ctx.json({
          error: '상품이 존재하지 않습니다.',
        })
      );
    }

    return res(ctx.json(product));
  }),
  // TODO: 상품 추가
  // TODO: 상품 수정
  // TODO: 상품 삭제

  // 장바구니 아이템 목록 조회
  rest.get(`${BASE}/cart-items`, (req, res, ctx) => {
    return res(ctx.json(cart));
  }),

  // 장바구니 아이템 추가
  rest.post(`${BASE}/cart-items`, async (req, res, ctx) => {
    type RequestBody = {
      productId: CartProduct['id'];
    };

    const { productId } = await req.json<RequestBody>();
    const product = products.find((product) => product.id === productId);

    if (!product) {
      return res(
        ctx.status(404),
        ctx.json({
          error: '상품이 존재하지 않습니다.',
        })
      );
    }

    return res(
      ctx.status(201),
      ctx.set('Location', `${BASE}/cart-items/${product.id}`),
      ctx.json({ message: '상품이 추가되었습니다.' })
    );
  }),

  // 장바구니 아이템 수량 변경
  rest.patch(`${BASE}/cart-items/:cartItemId`, async (req, res, ctx) => {
    type RequestBody = {
      quantity: CartProduct['quantity'];
    };

    const { cartItemId } = req.params;
    const { quantity } = await req.json<RequestBody>();

    const cartProduct = cart.find((cartProduct) => cartProduct.id === Number(cartItemId));

    if (!cartProduct) {
      return res(ctx.status(404), ctx.json({ error: '상품이 존재하지 않습니다.' }));
    }

    cartProduct.quantity = quantity;
    return res(ctx.status(200));
  }),

  // 장바구니 아이템 삭제
  rest.delete(`${BASE}/cart-items/:cartItemId`, (req, res, ctx) => {
    const { cartItemId } = req.params;

    const cartProduct = cart.find((cartProduct) => cartProduct.id === Number(cartItemId));

    if (!cartProduct) {
      return res(ctx.status(404), ctx.json({ error: '상품이 존재하지 않습니다.' }));
    }

    cart = cart.filter((cartProduct) => cartProduct.id !== Number(cartItemId));
  }),
];
