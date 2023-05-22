import { rest } from 'msw';
import productsData from './mockData.json';
import type { CartItem, Product } from '../types/types';

const products = productsData as Product[];

let cartList = [] as CartItem[];

export const handlers = [
  rest.get('/products', async (_, res, ctx) => {
    await delay(200);

    return res(ctx.status(200), ctx.json(products));
  }),

  rest.post('/products', async (req, res, ctx) => {
    const { product } = await req.json<{ product: Product }>();
    products.push(product);

    return res(ctx.status(200), ctx.text('Add Product Success'));
  }),

  rest.get('/cart-items', async (_, res, ctx) => {
    await delay(200);

    return res(ctx.status(200), ctx.json(cartList));
  }),

  rest.post('/cart-items', async (req, res, ctx) => {
    const { productId } = await req.json<{ productId: number }>();
    const foundProduct = products.find((product) => product.id === productId);
    if (foundProduct) {
      const newCartItem = {
        id: Date.now(),
        quantity: 1,
        product: foundProduct,
      };
      cartList.push(newCartItem);

      return res(ctx.status(201), ctx.text('Add Cart Item Success'));
    }
    return res(ctx.status(400, 'Product Does Not Found'));
  }),

  rest.patch('/cart-items/:cartItemId', async (req, res, ctx) => {
    const { cartItemId } = req.params;
    const { quantity } = await req.json<{ quantity: number }>();
    const foundCartItemIndex = cartList.findIndex((cart) => cart.id === Number(cartItemId));
    if (quantity && foundCartItemIndex !== -1) {
      const newCartList = cartList.map((cartItem, index) =>
        index === foundCartItemIndex ? { ...cartItem, quantity } : cartItem,
      );
      cartList = newCartList;
      return res(ctx.status(200), ctx.text('Cart Item Quantity Change Success'));
    }
    return res(ctx.status(400, 'CartItem Does Not Found'));
  }),

  rest.delete('/cart-items/:cartItemId', async (req, res, ctx) => {
    const { cartItemId } = req.params;
    const foundCartItemIndex = cartList.findIndex((cart) => cart.id === Number(cartItemId));
    if (foundCartItemIndex !== -1) {
      cartList.splice(foundCartItemIndex, 1);
      return res(ctx.status(200), ctx.text('Cart Item Delete Success'));
    }
    return res(ctx.status(400, 'CartItem Does Not Found'));
  }),
];

async function delay(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
