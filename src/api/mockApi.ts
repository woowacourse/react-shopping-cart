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
            const body = options.body;
            const { id, quantity } = JSON.parse(body);
            const cartItems = JSON.parse(localStorage.getItem('cart-items') || '[]');
            const itemIndex = cartItems.findIndex((item: any) => item.id === id);
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
            const { id } = JSON.parse(body);
            const cartItems = JSON.parse(localStorage.getItem('cart-items') || '[]');
            const removedCartItems = cartItems.filter((item: any) => item.id !== id);
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
