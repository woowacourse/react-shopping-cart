/* eslint-disable no-case-declarations */
import mockData from '../assets/mockData.json';
interface Response {
  data: string;
}

export const fetchMockProductList = () => {
  return new Promise<Response>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: JSON.stringify(mockData),
        }),
      1000
    )
  );
};

export const fetchMock = () => {
  return new Promise<Response>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: '',
        }),
      1000
    )
  );
};

interface Options {
  body: string;
}

function mockApi(endpoint: string, options?: Options) {
  const delay = Math.floor(Math.random() * 1000);
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
            const product = JSON.parse(productJSON);
            const newCartItem = {
              id: product.id,
              quantity: product.quantity,
              product: product.product,
            };
            const cartItems = JSON.parse(localStorage.getItem('cart-items') || '[]');
            cartItems.push(newCartItem);
            localStorage.setItem('cart-items', JSON.stringify(cartItems));
            resolve({ data: 'success' });
          } else {
            reject(new Error(`잘못된 요청 : ${endpoint}`));
          }
          break;

        case '/cart-items/update-quantity':
          if (options) {
            const productJSON = options.body;
            const { id, quantity } = JSON.parse(productJSON);
            const cartItems = JSON.parse(localStorage.getItem('cart-items') || '[]');
            const itemIndex = cartItems.findIndex((item: any) => item.id === id);
            cartItems[itemIndex].quantity = quantity;
            localStorage.setItem('cart-items', JSON.stringify(cartItems));
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
