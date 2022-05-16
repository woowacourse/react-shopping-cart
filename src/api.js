import axios from 'axios';

const DEV_URL = 'http://localhost:4000';
const PROD_URL = 'https://coke-react-shopping-cart.herokuapp.com';

const getProductList = async () => {
  return await axios({
    method: 'GET',
    url: `${PROD_URL}/products`,
  });
};

const getProductItem = async (id) => {
  return await axios({
    method: 'GET',
    url: `${PROD_URL}/products/${id}`,
  });
};

export { getProductList, getProductItem };
