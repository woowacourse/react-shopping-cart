import { UpdateCartItemReq } from './../apis/cart';
import { rest } from 'msw';
import { MockCart } from './fixtures/cart';
import { MockProducts } from './fixtures/products';
import { AddCartDataReq } from '../apis/cart';

export const handlers = [
  rest.post('/cart/:id', async (req, res, ctx) => {
    const { id, quantity }: AddCartDataReq = await req.json();

    const itemInCart = MockCart.cart.find(({ product }) => product.id === id);
    const product = MockProducts.items.find((product) => product.id === id);

    if (!product) return res(ctx.status(404), ctx.json({}));

    if (itemInCart) {
      const newCartItem = {
        ...structuredClone(itemInCart),
        quantity: itemInCart.quantity + quantity,
      };

      MockCart.cart.push(newCartItem);
    } else {
      const newCartItem = {
        id,
        quantity,
        product,
      };

      MockCart.cart.push(newCartItem);
    }

    return res(ctx.status(200), ctx.json(MockCart));
  }),

  rest.patch('/cart/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const { quantity }: { quantity: number } = await req.json();

    MockCart.cart = MockCart.cart.map((item) => {
      if (item.product.id === Number(id)) {
        return {
          ...item,
          quantity,
        };
      }

      return item;
    });

    return res(ctx.status(200), ctx.json(MockCart));
  }),

  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MockProducts));
  }),

  rest.get('/cart', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MockCart));
  }),
];
