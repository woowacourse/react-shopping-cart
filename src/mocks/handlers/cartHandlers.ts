import { rest } from 'msw';
import { CartProductItem } from '../../types/productType';

const getLocalStorageCartLst = localStorage.getItem('cartList');

const setLocalStorage = (newCartList: CartProductItem[]) =>
  localStorage.setItem('cartList', JSON.stringify(newCartList));

const isAlreadyInCartList = (id: number) =>
  cartList.some((cartItem: CartProductItem) => cartItem.id === id);

let cartList = getLocalStorageCartLst ? JSON.parse(getLocalStorageCartLst) : [];

export const cartHandlers = [
  // 장바구니 리스트 가져오기
  rest.get('/api/carts', (req, res, ctx) => {
    return res(ctx.delay(50), ctx.status(200), ctx.json(cartList));
  }),

  // 장바구니 리스트에 품목 추가
  rest.post('/api/carts', async (req, res, ctx) => {
    const productInfo = await req.json();
    const productId = Number(productInfo.productId);

    if (isAlreadyInCartList(productId)) {
      return res(
        ctx.delay(50),
        ctx.status(409),
        ctx.json({ message: '이미 장바구니에 존재하는 상품입니다.' })
      );
    }

    const product = await fetch(`/api/products/${productId}`).then((res) =>
      res.json()
    );

    cartList = [
      ...cartList,
      {
        id: productId,
        quantity: 1,
        product: { ...product },
      },
    ];

    setLocalStorage(cartList);

    return res(
      ctx.delay(50),
      ctx.status(201),
      ctx.set('Location', `/cart-items/${cartList[cartList.length - 1].id}`)
    );
  }),

  // 장바구니 리스트의 특정 품목 수량 수정
  rest.patch('/cart-items/:id', async (req, res, ctx) => {
    const cartItemId = Number(req.params.id);

    if (!isAlreadyInCartList) {
      return res(
        ctx.status(404),
        ctx.json({ message: '해당 상품은 장바구니에 존재하지 않습니다.' })
      );
    }

    const productInfo = await req.json();
    const newQuantity = Number(productInfo.quantity);

    cartList = cartList.map((cartItem: CartProductItem) =>
      cartItem.id === cartItemId
        ? { ...cartItem, quantity: newQuantity }
        : cartItem
    );

    setLocalStorage(cartList);

    return res(ctx.delay(50), ctx.status(200));
  }),

  // 장바구니 리스트의 특정 품목 삭제
  rest.delete('/cart-items/:id', (req, res, ctx) => {
    const cartItemId = Number(req.params.id);

    if (!isAlreadyInCartList) {
      return res(
        ctx.delay(50),
        ctx.status(404),
        ctx.json({ message: '해당 상품은 장바구니에 존재하지 않습니다.' })
      );
    }

    cartList = cartList.filter(
      (cartItem: CartProductItem) => cartItem.id !== cartItemId
    );

    setLocalStorage(cartList);

    return res(ctx.delay(50), ctx.status(204));
  }),
];
