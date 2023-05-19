import { rest } from 'msw';

import mockProduct from '../../public/assets/mockProducts.json';
import mockCartItems from '../../public/assets/mockCartItems.json';
import { CartItemType, ProductType } from '../types';

let products: ProductType[] = mockProduct;
let cartItems: CartItemType[] = mockCartItems;

//type Request = CartItemType[];

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),

  rest.get('/cart-items', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cartItems));
  }),

  rest.post('/cart-items', (req, res, ctx) => {
    const { productId } = req.body as any;
    const product = products.find((product) => product.id === productId);

    if (product) {
      const newCartItem: CartItemType = { id: Date.now(), quantity: 1, product };
      cartItems.push(newCartItem);

      return res(ctx.status(201));
    }
    return res(ctx.status(404));
  }),

  rest.patch('/cart-items/:cartItemId', (req, res, ctx) => {
    const { cartItemId } = req.params as any;
    const cartItemIndex = cartItems.findIndex((item) => item.id === cartItemId);

    if (cartItemIndex) {
      const newCart = [...cartItems];
      const { quantity } = req.params.cartItemId as any;
      newCart.splice(cartItemIndex, 1, { ...cartItems[cartItemIndex], quantity });
      cartItems = newCart;

      return res(ctx.status(200));
    }
    return res(ctx.status(404));
  }),

  rest.delete('/cart-items/:cartItemId', (req, res, ctx) => {
    const { cartItemId } = req.params as any;
    const cartItemIndex = cartItems.findIndex((item) => item.id === cartItemId);

    if (cartItemIndex) {
      cartItems = cartItems.filter((item) => item.id !== cartItemId);

      return res(ctx.status(204));
    }
    return res(ctx.status(404));
  }),
];
