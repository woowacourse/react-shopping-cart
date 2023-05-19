import { rest } from 'msw';
import productJson from './data/productList.json';
import cartListJson from './data/cartList.json';
import {
  CartItem,
  CartItemPatchBody,
  CartItemPostBody,
  Product,
} from 'src/types';
// 초기 상품 목록

const initialData: {
  products: Product[];
  cartLists: CartItem[];
} = {
  products: productJson.choonsikProducts as Product[],
  cartLists: [] as CartItem[],
};

export const handlers = [
  // 상품 목록 조회 API
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(initialData.products));
  }),

  // 장바구니 조회 API
  rest.get('/api/cart-items', async (req, res, ctx) => {
    const cartItem = localStorage.getItem('cartItem');

    if (cartItem == null) return res(ctx.status(200), ctx.json([]));

    const currentCartItems = (await JSON.parse(cartItem)) as CartItem[];
    initialData.cartLists = currentCartItems;

    return res(ctx.status(200), ctx.json(currentCartItems));
  }),

  // 장바구니 추가 API
  rest.post('/api/cart-items', async (req, res, ctx) => {
    const { productId } = (await req.json()) as CartItemPostBody;

    const product = initialData.products.find(({ id }) => id === productId);

    if (!product) {
      return res(
        ctx.status(403),
        ctx.json({ message: '일치하는 상품이 없습니다.' })
      );
    }

    initialData.cartLists.push({
      id: productId,
      quantity: 1,
      product,
      isSelected: true,
    });

    return res(ctx.status(201), ctx.json({}));
  }),

  // 장바구니 삭제 API
  rest.delete('/api/cart-items/:cartItemId', (req, res, ctx) => {
    const { cartItemId } = req.params;
    const { cartLists } = initialData;

    const selectedCartIndex = cartLists.findIndex(
      ({ id }) => id === Number(cartItemId)
    );

    if (selectedCartIndex === -1) {
      return res(
        ctx.status(403),
        ctx.json({ message: '일치하는 목록이 없습니다.' })
      );
    }

    const deletedList = cartLists.filter(({ id }) => id !== Number(cartItemId));

    initialData.cartLists = deletedList;

    return res(ctx.status(204));
  }),

  // 장바구니 갱신 API

  rest.patch('/api/cart-items/:cartItemId', async (req, res, ctx) => {
    const { cartItemId } = req.params;
    const { quantity } = (await req.json()) as CartItemPatchBody;

    const cartItemIndex = initialData.cartLists.findIndex(
      ({ id }) => id === Number(cartItemId)
    );

    if (cartItemIndex === -1) {
      return res(
        ctx.status(403),
        ctx.json({ message: '장바구니에 존재하지 않는 상품입니다.' })
      );
    }

    initialData.cartLists[cartItemIndex] = {
      ...initialData.cartLists[cartItemIndex],
      quantity,
    };

    return res(ctx.status(200), ctx.json({}));
  }),
];
