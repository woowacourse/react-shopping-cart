import { ERROR_MESSAGE } from 'constant/messages';

const productAPI = {
  BASE_URL: 'https://tigers-react-shopping-cart.herokuapp.com',
  PATH: {
    PRODUCTS: 'products',
  },

  async getProducts() {
    const response = await fetch(`${this.BASE_URL}/${this.PATH.PRODUCTS}`);

    if (!response.ok) {
      return new Error(ERROR_MESSAGE.FAIL_TO_FETCH_PRODUCTS);
    }

    const json = await response.json();

    return json;
  },

  async getTargetProduct(id) {
    const response = await fetch(`${this.BASE_URL}/${this.PATH.PRODUCTS}/${id}`);

    if (!response.ok) {
      return new Error(ERROR_MESSAGE.FAIL_TO_FETCH_PRODUCTS);
    }

    const json = await response.json();

    return json;
  },
};

export default productAPI;
