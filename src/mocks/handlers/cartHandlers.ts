import { rest } from 'msw';
import { CartProductList } from '../../types/productType';

const getLocalStorageCartLst = localStorage.getItem('cartList');

const setLocalStorage = (newCartList: CartProductList[]) =>
  localStorage.setItem('cartList', JSON.stringify(newCartList));

const isAlreadyInCartList = (id: number) =>
  cartList.some((cartItem: CartProductList) => cartItem.id === id);

let cartList = getLocalStorageCartLst ? JSON.parse(getLocalStorageCartLst) : [];

export const cartHandlers = [
  rest.get('/api/carts', (req, res, ctx) => {
    return res(ctx.delay(10), ctx.status(200), ctx.json(cartList));
  }),

  rest.post('/api/carts', async (req, res, ctx) => {
    const productInfo = await req.json();
    const productId = Number(productInfo.productId);

    if (isAlreadyInCartList(productId)) {
      return res(
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
      ctx.status(201),
      ctx.set('Location', `/cart-items/${cartList[cartList.length - 1].id}`)
    );
  }),

  rest.patch('/cart-items/:id', async (req, res, ctx) => {
    const cartItemId = Number(req.params.id);

    if (!isAlreadyInCartList) {
      return res(
        ctx.status(404),
        ctx.json({ message: '해당 상품은 장바구니에 존재하지 않습니다.' })
      );
    }

    const newQuantity = Number(await req.text());

    cartList = cartList.map((cartItem: CartProductList) =>
      cartItem.id === cartItemId
        ? { ...cartItem, quantity: newQuantity }
        : cartItem
    );

    setLocalStorage(cartList);

    return res(ctx.status(200));
  }),

  rest.delete('/api-items/:id', (req, res, ctx) => {
    const cartItemId = Number(req.params.id);

    if (!isAlreadyInCartList) {
      return res(
        ctx.status(404),
        ctx.json({ message: '해당 상품은 장바구니에 존재하지 않습니다.' })
      );
    }

    cartList = cartList.filter(
      (cartItem: CartProductList) => cartItem.id !== cartItemId
    );

    setLocalStorage(cartList);

    return res(ctx.status(204));
  }),
];
