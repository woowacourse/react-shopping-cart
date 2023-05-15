import * as T from '../types/ProductType';
import safeJsonParse from '../utils/safeJsonParse';

/* eslint-disable no-case-declarations */
interface Response {
  data: string;
}

interface Options {
  body: string;
}

function mockApi(endpoint: string, options?: Options) {
  const delay = 100;
  return new Promise<Response>((resolve, reject) => {
    setTimeout(() => {
      switch (endpoint) {
        case '/products':
          const products = localStorage.getItem('products') || '[]';
          resolve({ data: products });
          break;

        case '/cart-items':
          const cartItems = localStorage.getItem('cart-items') || '[]';
          resolve({ data: cartItems });
          break;

        case '/cart-items/add':
          if (options) {
            const productJSON = options.body;
            const product = safeJsonParse<T.CartProduct>(productJSON);

            if (!product) {
              alert('잘못된 상품입니다. 잠시후 다시 시도해주세요.');
              return;
            }

            const newCartItem = {
              id: product.id,
              quantity: product.quantity,
              product: product.product,
            };

            const cartItems =
              safeJsonParse<T.CartProduct[]>(localStorage.getItem('cart-items') || '[]') ?? [];

            cartItems.push(newCartItem);
            localStorage.setItem('cart-items', JSON.stringify(cartItems));
            resolve({ data: 'success' });
          } else {
            reject(new Error(`잘못된 요청 : ${endpoint}`));
          }
          break;

        case '/cart-items/update-quantity':
          if (options) {
            const body = options.body;
            const parsedData = safeJsonParse<Pick<T.CartProduct, 'id' | 'quantity'>>(body);
            if (!parsedData) {
              alert('잘못된 상품입니다. 잠시후 다시 시도해주세요.');
              return;
            }

            const { id, quantity } = parsedData;

            const cartItems =
              safeJsonParse<T.CartProduct[]>(localStorage.getItem('cart-items') || '[]') ?? [];

            const itemIndex = cartItems.findIndex((item: T.CartProduct) => item.id === id);
            cartItems[itemIndex].quantity = quantity;
            localStorage.setItem('cart-items', JSON.stringify(cartItems));
            resolve({ data: 'success' });
          } else {
            reject(new Error(`잘못된 요청 : ${endpoint}`));
          }
          break;

        case '/cart-items/remove':
          if (options) {
            const body = options.body;
            const parsedData = safeJsonParse<Pick<T.CartProduct, 'id'>>(body);

            if (!parsedData) {
              alert('잘못된 상품입니다. 잠시후 다시 시도해주세요.');
              return;
            }

            const { id } = parsedData;

            const cartItems =
              safeJsonParse<T.CartProduct[]>(localStorage.getItem('cart-items') || '[]') ?? [];

            const removedCartItems = cartItems.filter((item: T.CartProduct) => item.id !== id);
            localStorage.setItem('cart-items', JSON.stringify(removedCartItems));
            resolve({ data: 'success' });
          } else {
            reject(new Error(`잘못된 요청 : ${endpoint}`));
          }
          break;

        default:
          reject(new Error(`잘못된 요청 : ${endpoint}`));
          break;
      }
    }, delay);
  });
}

export default mockApi;
