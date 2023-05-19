import { rest } from 'msw';
import { CartList, ItemInfo } from '../types/CartList.ts';
import { getCartListFromLocalStorage } from '../utils/localStorageCartList.ts';
import ProductItem from '../data/productList.json';
import { CartUpdateBody } from '../types/requestBody.ts';

const cart: CartList = getCartListFromLocalStorage() ?? { items: [] };

const updateQuantity = (itemId: number, quantity: number) => {
  cart.items = cart.items.map((item) => (item.id === itemId ? { ...item, quantity } : item));
};

const deleteItem = (itemId: number) => {
  cart.items = cart.items.filter((item) => item.id !== itemId);
};

const addToCart = (itemId: number, quantity: number, productInfo: ItemInfo) => {
  cart.items.push({ id: itemId, quantity, itemInfo: productInfo });
};

export const handlers = [
  rest.get('/src/assets/*', (req) => {
    return req.passthrough();
  }),

  rest.get('http://image.elandgift.com/images/web/Product/:path*', (req) => {
    return req.passthrough();
  }),

  rest.get('https://image.elandgift.com/images/web/Product/:path*', (req) => {
    return req.passthrough();
  }),

  rest.get('/product-list', (_, res, ctx) => {
    return res(ctx.json(ProductItem));
  }),

  rest.get('/cart', (_, res, ctx) => {
    return res(ctx.json(cart));
  }),

  rest.post<CartUpdateBody>('/cart/update', (req, res, ctx) => {
    const { itemId, quantity } = req.body;

    if (!itemId) {
      return res(ctx.status(404, 'Item ID and quantity are required'));
    }

    const itemExistsInCart = cart.items.some((item) => item.id === itemId);
    const productList = Array.from(ProductItem);
    const productInfo = productList.find((product) => product.id === itemId);

    if (!productInfo) {
      return res(ctx.status(404, 'Product not found'));
    }

    if (itemExistsInCart && quantity === 0) {
      deleteItem(itemId);
    } else if (itemExistsInCart) {
      updateQuantity(itemId, quantity);
    } else {
      addToCart(itemId, quantity, productInfo);
    }

    return res(ctx.json({ id: itemId, quantity, itemInfo: productInfo }));
  }),
];
