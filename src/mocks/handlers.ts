import { rest } from 'msw';
import { LOCAL_STORAGE_KEY } from '../constants';
import { cartItems, products } from '../data/mockData';
import { CartItem, Product } from '../types';
import { setLocalStorage } from '../utils/localStorage';

const handlers = [
  // 제품 목록
  rest.get('/products', (req, res, ctx) => res(ctx.delay(2000), ctx.status(200), ctx.json(products))),

  // 제품 추가
  rest.post('/products', (req, res, ctx) => {
    const newData = req.json();
    const id = Math.random().toString(36).substring(7);
    const responseWithId = { ...newData, id: Number(id) };
    products.push(responseWithId as unknown as Product);

    return res(ctx.status(201), ctx.json(responseWithId));
  }),

  // 특정 id의 제품 정보
  rest.get('/products/:id', (req, res, ctx) => {
    const { id } = req.params;
    const product = products.find(item => item.id === Number(id));
    const responseWithId = { ...product, id };

    if (responseWithId) {
      return res(ctx.status(200), ctx.json(responseWithId));
    }
    return res(ctx.status(404));
  }),

  // 특정 id 제품 삭제
  rest.delete('/products/:id', (req, res, ctx) => {
    const { id } = req.params;
    const index = products.findIndex(item => item.id === Number(id));

    if (index !== -1) {
      products.splice(index, 1);
      return res(ctx.status(204));
    }
    return res(ctx.status(404));
  }),

  // 특정 id 제품 수정
  rest.put('/products/:id', (req, res, ctx) => {
    const { id } = req.params;
    const index = products.findIndex(item => item.id === Number(id));

    if (index !== -1) {
      products[index] = req.json() as unknown as Product;
      return res(ctx.json(products[index]));
    }
    return res(ctx.status(404));
  }),

  // 장바구니 아이템 조회
  rest.get('/cart-items', (req, res, ctx) => res(ctx.delay(100), ctx.status(200), ctx.json(cartItems))),

  // 장바구니 아이템 추가
  rest.post<CartItem>('/cart-items', async (req, res, ctx) => {
    const { productId } = await req.json();

    const item = {
      id: Math.floor(Math.random() * 1000),
      quantity: 1,
      product: products.find(product => product.id === productId),
    };

    cartItems.push(item as CartItem);
    setLocalStorage(LOCAL_STORAGE_KEY.CART_ITEM, cartItems);

    return res(ctx.delay(100), ctx.status(201), ctx.set('Location', `/cart-items/${item.id}`));
  }),

  // 장바구니 아이템 수량 변경
  rest.patch<CartItem>('/cart-items/:cartItemId', async (req, res, ctx) => {
    const { cartItemId } = req.params;
    const { quantity } = await req.json();

    const itemIndex = cartItems.findIndex(item => item.id === Number(cartItemId));

    if (itemIndex === -1) {
      return res(ctx.status(404));
    }

    cartItems[itemIndex].quantity = quantity;
    setLocalStorage(LOCAL_STORAGE_KEY.CART_ITEM, cartItems);

    return res(ctx.delay(100), ctx.status(200));
  }),

  // 장바구니 아이템 삭제
  rest.delete('/cart-items/:cartItemsId', (req, res, ctx) => {
    const { cartItemsId } = req.params;
    const itemIndex = cartItems.findIndex(item => item.id === Number(cartItemsId));

    if (itemIndex >= 0) {
      cartItems.splice(itemIndex, 1);
      setLocalStorage(LOCAL_STORAGE_KEY.CART_ITEM, cartItems);
      return res(ctx.delay(100), ctx.status(204), ctx.set('Location', `/cart-items/${cartItemsId}`));
    }
    return res(ctx.status(404));
  }),
];

export default handlers;
