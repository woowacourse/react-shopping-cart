import { API_URL } from '@/api/constants';
import { rest } from 'msw';
import { cartList } from '../data/cart';

export const cartHanlders = [
  rest.post(`${API_URL}/carts`, (req, res, ctx) => {
    const { body: product } = req;

    cartList.current.push(product);

    return res(res => {
      res.statusText = 'Created';
      return res;
    });
  }),

  rest.get(`${API_URL}/carts`, (req, res, ctx) => {
    return res(ctx.json(cartList.current));
  }),

  rest.delete(`${API_URL}/carts/:productId`, (req, res, ctx) => {
    const {
      params: { productId },
    } = req;

    cartList.current = cartList.current.filter(cart => Number(productId) !== cart.id);

    return res(ctx.json());
  }),

  rest.patch(`${API_URL}/carts/:productId`, (req, res, ctx) => {
    const {
      params: { productId },
      body: newCartProduct,
    } = req;

    cartList.current = cartList.current.map(cart => {
      if (cart.id === Number(productId)) {
        return newCartProduct;
      }
      return cart;
    });

    return res(ctx.json());
  }),
];
