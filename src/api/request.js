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
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
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
  POST: async (type, content) => {
    try {
      const requestOption = {
        method: 'POST',
        body: JSON.stringify(content),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      };

      const response = await fetch(`${fetchUrl[type]}`, requestOption);

      if (!response.ok) {
        throw response;
      }

      return Number(response.headers.get('Location').split('/')[7]);
    } catch (response) {
      console.error(await response);
    }
  },
  PUT: async (ref, content, targetId) => {
    collection[ref].doc(targetId).update(content);
  },
  DELETE: async (type, targetId) => {
    try {
      const requestOption = {
        method: 'DELETE',
      };

      const response = await fetch(`${fetchUrl[type]}${targetId ? '/' + targetId : ''}`, requestOption);

      if (!response.ok) {
        throw response;
      }
      console.log(response);
    } catch (response) {
      console.error(await response);
    }
  },
};

export { requestTable };
