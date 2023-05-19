import { rest } from 'msw';

import mockProduct from '../../public/assets/mockProducts.json';
import mockCartItems from '../../public/assets/mockCartItems.json';
import { CartItemType, ProductType } from '../types';

let products: ProductType[] = mockProduct;
let cartItems: CartItemType[] = mockCartItems;

//type Request = CartItemType[];

interface AddCartItemRequest {
  body: {
    productId: number;
  };
}

interface UpdateQuantityRequest {
  params: {
    cartItemId: string;
  };
  body: {
    quantity: number;
  };
}

interface DeleteCartItemRequest {
  params: {
    cartItemId: string;
  };
}

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),

  rest.get('/cart-items', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cartItems));
  }),

  rest.post('/cart-items', (req: AddCartItemRequest, res, ctx) => {
    const { productId } = req.body;
    const product = products.find((product) => product.id === productId);

    if (product) {
      const newCartItem: CartItemType = { id: Date.now(), quantity: 1, product };
      cartItems.push(newCartItem);

      return res(ctx.status(201));
    }
    return res(ctx.status(404));
  }),

  rest.patch('/cart-items/:cartItemId', (req: UpdateQuantityRequest, res, ctx) => {
    const { cartItemId } = req.params;
    const cartItemIndex = cartItems.findIndex((item) => item.id === Number(cartItemId));

    if (cartItemIndex) {
      const newCart = [...cartItems];
      newCart.splice(cartItemIndex, 1, {
        ...cartItems[cartItemIndex],
        quantity: req.body.quantity,
      });
      cartItems = newCart;

      return res(ctx.status(200));
    }
    return res(ctx.status(404));
  }),

  rest.delete('/cart-items/:cartItemId', (req: DeleteCartItemRequest, res, ctx) => {
    const { cartItemId } = req.params;
    const cartItemIndex = cartItems.findIndex((item) => item.id === Number(cartItemId));

    if (cartItemIndex) {
      cartItems = cartItems.filter((item) => item.id !== Number(cartItemId));

      return res(ctx.status(204));
    }
    return res(ctx.status(404));
  }),
];
