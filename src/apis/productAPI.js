import { fetchData } from 'utils/api';
import { ERROR_MESSAGE } from 'constants/messages';

const productAPI = {
  BASE_URL: 'https://tigers-react-shopping-cart.herokuapp.com',
  PATH: {
    PRODUCTS: 'products',
  },

  async getProducts() {
    const response = await fetchData(`${this.BASE_URL}/${this.PATH.PRODUCTS}`);

    if (response instanceof Error) {
      alert(ERROR_MESSAGE.FAIL_TO_FETCH_PRODUCTS);

      return;
    }

    return response;
  },
};

export default productAPI;
