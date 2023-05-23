import { rest } from 'msw';
import productJson from './data/productList.json';
import { CartItem, CartItemPatchBody, CartItemPostBody } from 'src/types';
import { getLocalStorage, setLocalStorage } from 'src/utils/storage';
// 초기 상품 목록

const products = productJson.choonsikProducts;

export const handlers = [
  // 상품 목록 조회 API
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json(products));
  }),

  // 장바구니 조회 API
  rest.get('/api/cart-items', async (req, res, ctx) => {
    const { data: cartList, error } = getLocalStorage<CartItem[]>(
      'cartItem',
      []
    );

    if (error.isError) return res(ctx.status(200), ctx.json([]));

    return res(ctx.status(200), ctx.json(cartList));
  }),

  // 장바구니 추가 API
  rest.post('/api/cart-items', async (req, res, ctx) => {
    const { productId } = (await req.json()) as CartItemPostBody;

    const product = products.find(({ id }) => id === productId);

    if (!product) {
      return res(
        ctx.status(403),
        ctx.json({ message: '일치하는 상품이 없습니다.' })
      );
    }

    const { data: cartList } = getLocalStorage<CartItem[]>('cartItem', []);

    setLocalStorage('cartItem', [
      ...cartList,
      {
        id: productId,
        quantity: 1,
        product,
      },
    ]);

    return res(ctx.status(201), ctx.json({}));
  }),

  // 장바구니 삭제 API
  rest.delete('/api/cart-items/:cartItemId', (req, res, ctx) => {
    const { cartItemId } = req.params;
    const { data: cartList, error } = getLocalStorage<CartItem[]>(
      'cartItem',
      []
    );

    const selectedCartIndex = cartList.findIndex(
      ({ id }) => id === Number(cartItemId)
    );

    if (selectedCartIndex === -1) {
      return res(
        ctx.status(403),
        ctx.json({ message: '일치하는 목록이 없습니다.' })
      );
    }

    const deletedList = cartList.filter(({ id }) => id !== Number(cartItemId));

    setLocalStorage('cartItem', deletedList);

    return res(ctx.status(204));
  }),

  // 장바구니 갱신 API

  rest.patch('/api/cart-items/:cartItemId', async (req, res, ctx) => {
    const { cartItemId } = req.params;
    const { quantity } = (await req.json()) as CartItemPatchBody;

    const { data: cartList, error } = getLocalStorage<CartItem[]>(
      'cartItem',
      []
    );

    const cartItemIndex = cartList.findIndex(
      ({ id }) => id === Number(cartItemId)
    );

    if (cartItemIndex === -1) {
      return res(
        ctx.status(403),
        ctx.json({ message: '장바구니에 존재하지 않는 상품입니다.' })
      );
    }

    const updated = [...cartList].map((item, idx) =>
      idx === cartItemIndex ? { ...item, quantity } : item
    );

    setLocalStorage('cartItem', updated);

    return res(ctx.status(200), ctx.json({}));
  }),
];
