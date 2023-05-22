import { rest } from 'msw';
import { product } from './mockData';
import { useLocalStorage } from '../components/hooks/useLocalStorage';
import { Cart } from '../types';

const { getLocalStorageData, setLocalStorageData } = useLocalStorage();
const cartListStorage = getLocalStorageData<Cart[]>('cartList');
const cartData = { cartList: [...cartListStorage] };

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.delay(800), ctx.status(200), ctx.json(product));
  }),

  rest.get('/cart-items', (req, res, ctx) => {
    return res(ctx.delay(500), ctx.status(200), ctx.json(cartData));
  }),

  rest.post('/cart-items', async (req, res, ctx) => {
    const { id } = await req.json();
    const productItem = product.product.find((product) => product.id === id);

    if (!productItem) return;

    const cartItem = { id: id, quantity: 1, product: productItem };
    cartData.cartList = [...cartData.cartList, cartItem];

    setLocalStorageData<Cart[]>(
      'cartList',
      cartData.cartList.filter((cartItem) => cartItem.quantity !== 0)
    );

    return res(ctx.status(201));
  }),

  rest.patch('/cart-items', async (req, res, ctx) => {
    const { id, quantity } = await req.json();

    cartData.cartList = cartData.cartList.map((cartItem) => {
      if (cartItem.id === id) {
        return { ...cartItem, quantity: quantity };
      }
      return cartItem;
    });

    setLocalStorageData<Cart[]>('cartList', cartData.cartList);

    return res(ctx.status(200));
  }),

  rest.delete('/cart-items', async (req, res, ctx) => {
    const { id } = await req.json();

    cartData.cartList = cartData.cartList = cartData.cartList.filter(
      (item) => item.id !== id
    );

    setLocalStorageData<Cart[]>('cartList', cartData.cartList);

    return res(ctx.status(200));
  }),
];
