import axios from 'axios';

const DEV_URL = 'http://localhost:4000';
const PROD_URL = 'https://coke-react-shopping-cart.herokuapp.com';
const BASE_URL = '';
let API_URL = process.env.NODE_ENV === 'development' ? BASE_URL : PROD_URL;

const getProductList = async () => {
  return await axios({
    method: 'GET',
    url: `${API_URL}/products`,
  });
};

const getProductItem = async (id) => {
  return await axios({
    method: 'GET',
    url: `${API_URL}/products/${id}`,
  });
};

const getCartList = async () => {
  return await axios({
    method: 'GET',
    url: `${API_URL}/cart`,
  });
};

const postCartItem = async (payload) => {
  return await axios({
    method: 'POST',
    url: `${API_URL}/cart`,
    headers: { 'Content-Type': 'application/json' },
    data: payload,
  });
};

const deleteCartItem = async (payload) => {
  const { id } = payload;

  return await axios({
    method: 'DELETE',
    url: `${API_URL}/cart/${id}`,
  });
};

const patchCartItem = async (payload) => {
  const { id, quantity } = payload;

  return await axios({
    method: 'PATCH',
    url: `${API_URL}/cart/${id}`,
    headers: { 'Content-Type': 'application/json' },
    data: { quantity },
  });
};

export { getProductList, getProductItem, getCartList, postCartItem, deleteCartItem, patchCartItem };
