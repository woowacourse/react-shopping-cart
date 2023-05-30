import { createApiRequests } from './createApiRequests';

const fetchCartItemsMethods = createApiRequests('')('cart-items');

const fetchCartItems = {
  get: () => {
    return fetchCartItemsMethods.GET();
  },

  add: (productId: number) => {
    return fetchCartItemsMethods.POST({
      body: {
        productId,
      },
    });
  },

  update: (cartId: number, quantity: number) => {
    return fetchCartItemsMethods.PATCH({
      pathParameter: `${cartId}`,
      body: {
        quantity,
      },
    });
  },

  delete: (cartId: number) => {
    return fetchCartItemsMethods.DELETE(String(cartId));
  },
};

export default fetchCartItems;
