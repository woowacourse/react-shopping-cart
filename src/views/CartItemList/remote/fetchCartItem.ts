import { BASE_URL, CART_PATH } from '../../../constants/urlConstants';
import { createApiRequests } from '../../../utils/createApiRequests';

const fetchCartItemsMethods = createApiRequests(BASE_URL)(CART_PATH);

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
