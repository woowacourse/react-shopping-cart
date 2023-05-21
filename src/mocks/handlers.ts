import { rest } from 'msw';
import { product } from './mockData';
import { useLocalStorage } from '../components/hooks/useLocalStorage';
import { Cart } from '../types';

const { getLocalStorageData } = useLocalStorage();

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.delay(800), ctx.status(200), ctx.json(product));
  }),

  rest.get('/cart-items', (req, res, ctx) => {
    const cartListStorage = getLocalStorageData<Cart[]>('cartList');
    const cartData = { cartList: [...cartListStorage] };

    return res(ctx.delay(1000), ctx.status(200), ctx.json(cartData));
  }),
];
