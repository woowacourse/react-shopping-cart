import { PRODUCT_LIST } from 'mockData/productList';
import { rest } from 'msw';
import { CartInformation } from '@type/types';
import { CART_LIST_LOCAL_KEY } from '@constants/common';

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    const data = PRODUCT_LIST.productList;

    if (!data) {
      return res(ctx.status(403), ctx.json(data));
    }

    return res(
      ctx.set('Content-Type', 'application/json'),
      ctx.status(200),
      ctx.json(data),
      ctx.delay(1500)
    );
  }),

  rest.get('/cart-items', (req, res, ctx) => {
    const cartData = JSON.parse(
      localStorage.getItem(CART_LIST_LOCAL_KEY) || '[]'
    );

    if (!cartData) {
      return res(ctx.status(403), ctx.json(cartData));
    }

    return res(
      ctx.set('Content-Type', 'application/json'),
      ctx.status(200),
      ctx.json(cartData)
    );
  }),

  rest.post('/cart-items', async (req, res, ctx) => {
    const cartData = JSON.parse(
      localStorage.getItem(CART_LIST_LOCAL_KEY) || '[]'
    );
    const { productId } = await req.json();
    const data = PRODUCT_LIST.productList;

    const addData = {
      id: productId,
      product: data.find((product) => product.id === productId),
      quantity: 1,
    };

    const updatedCart = [...cartData, addData];

    localStorage.setItem(CART_LIST_LOCAL_KEY, JSON.stringify(updatedCart));

    if (!addData) {
      return res(ctx.status(403), ctx.json(addData));
    }

    return res(
      ctx.status(201),
      ctx.set('Location', `/cart-items/${productId}`)
    );
  }),

  rest.patch('/cart-items/:id', async (req, res, ctx) => {
    const cartItemId = Number(req.params.id);
    const { quantity } = await req.json();
    const cartData: CartInformation[] = JSON.parse(
      localStorage.getItem(CART_LIST_LOCAL_KEY) || '[]'
    );

    const updatedCart = cartData.map((product) => {
      if (product.id === cartItemId) {
        return {
          ...product,
          quantity,
        };
      }
      return product;
    });

    localStorage.setItem(CART_LIST_LOCAL_KEY, JSON.stringify(updatedCart));
    return res(
      ctx.status(200),
    );
  }),
];
