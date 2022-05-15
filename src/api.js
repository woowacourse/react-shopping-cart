import axios from 'axios';

const DEV_URL = 'http://localhost:4000';

const getProductList = async () => {
  return await axios({
    method: 'GET',
    url: `${DEV_URL}/products`,
  });
};

const getProductItem = async (id) => {
  return await axios({
    method: 'GET',
    url: `${DEV_URL}/products/${id}`,
  });
};

export { getProductList, getProductItem };
