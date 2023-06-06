import { rest } from 'msw';
import {
  addCartItemToLocalStorage,
  deleteCartItemsFromLocalStorage,
  getCartItemsFromLocalStorage,
  getProductListFromLocalStorage,
  patchCartItemQuantityToLocalStorage,
} from '../utils/localStorage';

export const cartHandlers = [
  rest.get('/cart-items', (_, res, ctx) => {
    const cartItems = getCartItemsFromLocalStorage();

    return res(ctx.json(cartItems), ctx.status(200));
  }),
  rest.post('/cart-items', async (req, res, ctx) => {
    const requestData = await req.json();
    const productId = await requestData.productId;

    const cartItems = getCartItemsFromLocalStorage();
    const productList = getProductListFromLocalStorage();

    const product = productList.find((p) => p.id === productId);

    if (cartItems.some((cartItem) => cartItem.id === productId))
      return res(ctx.json('이미 있는 상품입니다!'), ctx.status(400));

    addCartItemToLocalStorage({
      id: productId,
      quantity: 1,
      product,
    });

    return res(ctx.json('success'), ctx.status(200));
  }),
  rest.patch('/cart-items/:id', async (req, res, ctx) => {
    const requestData = await req.json();
    const quantity = await requestData.quantity;
    const productId = Number(req.params.id);

    const cartItems = getCartItemsFromLocalStorage();

    if (!cartItems.some((cartItem) => cartItem.id === productId))
      return res(
        ctx.json('수량을 변경하려는 상품이 존재하지 않습니다!'),
        ctx.status(400)
      );

    patchCartItemQuantityToLocalStorage(productId, quantity);

    return res(ctx.json('success'), ctx.status(200));
  }),
  rest.delete('/cart-items/:id', (req, res, ctx) => {
    const productId = Number(req.params.id);
    const cartItems = getCartItemsFromLocalStorage();

    if (!cartItems.some((cartItem) => cartItem.id === productId))
      return res(
        ctx.json(`삭제하려는 상품이 존재하지 않습니다!`),
        ctx.status(400)
      );

    deleteCartItemsFromLocalStorage(productId);

    return res(ctx.json('success'), ctx.status(200));
  }),
];
