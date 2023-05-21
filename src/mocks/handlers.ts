import { CartProduct } from './../types/product';
import mockProducts from './mockProducts.json';
import { API_BASE } from 'apis/products/api';
import { rest } from 'msw';
import { Product } from 'types/product';
import store from 'utils/localStorage';

const MOCK_CART_KEY = 'MOCK_CART';

let products: Product[] = mockProducts;

if (!store.getStorage(MOCK_CART_KEY)) {
  store.setStorage(MOCK_CART_KEY, []);
}

const getCart = (): CartProduct[] => {
  return store.getStorage(MOCK_CART_KEY);
};

export const handlers = [
  // 상품 목록 조회
  rest.get(`${API_BASE}/products`, (req, res, ctx) => {
    return res(ctx.json(products));
  }),

  // 상품 조회
  rest.get(`${API_BASE}/products/:productId`, (req, res, ctx) => {
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
  rest.get(`${API_BASE}/cart-items`, (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.json(getCart()));
  }),

  // 장바구니 아이템 추가
  rest.post(`${API_BASE}/cart-items`, async (req, res, ctx) => {
    type RequestBody = {
      productId: Product['id'];
    };
    const { productId } = await req.json<RequestBody>();

    const product = products.find((product) => product.id === productId);
    const cartProduct = getCart().find((cartProduct) => cartProduct.id === productId);

    if (!product) {
      return res(
        ctx.status(404),
        ctx.json({
          error: '해당 상품이 존재하지 않습니다.',
        })
      );
    }

    if (cartProduct) {
      return res(
        ctx.status(404),
        ctx.json({
          error: '장바구니에 이미 상품이 존재합니다.',
        })
      );
    }

    store.addItem(MOCK_CART_KEY, {
      id: product.id,
      quantity: 1,
      checked: true,
      product,
    });

    return res(
      ctx.status(201),
      ctx.set('Location', `${API_BASE}/cart-items/${product.id}`),
      ctx.json({ message: '상품이 추가되었습니다.' })
    );
  }),

  // 장바구니 아이템 변경
  rest.patch(`${API_BASE}/cart-items/:cartItemId`, async (req, res, ctx) => {
    type RequestBody = {
      quantity?: CartProduct['quantity'];
      checked?: CartProduct['checked'];
    };

    const { cartItemId } = req.params;
    const { quantity, checked } = await req.json<RequestBody>();

    const cartProduct = getCart().find((cartProduct) => cartProduct.id === Number(cartItemId));

    if (!cartProduct) {
      return res(ctx.status(404), ctx.json({ error: '상품이 존재하지 않습니다.' }));
    }

    store.setStorage(
      MOCK_CART_KEY,
      getCart().map((cartProduct) => {
        if (cartProduct.id === Number(cartItemId)) {
          if (quantity !== undefined) {
            cartProduct.quantity = quantity;
          }
          if (checked !== undefined) {
            cartProduct.checked = checked;
          }
        }
        return cartProduct;
      })
    );

    return res(ctx.status(200));
  }),

  // 장바구니 아이템 삭제
  rest.delete(`${API_BASE}/cart-items/:cartItemId`, (req, res, ctx) => {
    const { cartItemId } = req.params;

    const cartProduct = getCart().find((cartProduct) => cartProduct.id === Number(cartItemId));

    if (!cartProduct) {
      return res(ctx.status(404), ctx.json({ error: '상품이 존재하지 않습니다.' }));
    }

    store.setStorage(
      MOCK_CART_KEY,
      getCart().filter((cartProduct) => cartProduct.id !== Number(cartItemId))
    );

    return res(ctx.status(204));
  }),
];
