import { SCHEMA } from '../constants';
import { firestore } from '../firebase';

const collection = {
  [SCHEMA.PRODUCT]: firestore.collection(SCHEMA.PRODUCT),
  [SCHEMA.ORDER]: firestore.collection(SCHEMA.ORDER),
  [SCHEMA.SHOPPING_CART]: firestore.collection(SCHEMA.SHOPPING_CART),
};
const BASE_URL = 'https://shopping-cart.techcourse.co.kr';

const fetchUrl = {
  products: `${BASE_URL}/api/products`,
  orders: `${BASE_URL}/api/customers/hyuuunjukim/orders`,
  carts: `${BASE_URL}/api/customers/hyuuunjukim/carts`,
};

const requestTable = {
  GET: async (type, targetId) => {
    try {
      const requestOption = {
        method: 'GET',
      };

      const response = await fetch(`${fetchUrl[type]}${targetId ? '/' + targetId : ''}`, requestOption);

      if (!response.ok) {
        throw response;
      }

      return await response.json();
    } catch (response) {
      console.error(await response);
    }
  },
  POST: async (ref, content) => collection[ref].add(content),
  PUT: async (ref, targetId, content) => collection[ref].doc(targetId).update(content),
  DELETE: async (ref, targetId) => collection[ref].doc(targetId).delete(),
};

export { requestTable };
