import axios from 'axios';

const BASE_URL = 'https://shopping-cart.techcourse.co.kr/api';
const customer_name = 'shinsehantan';

export const getCartItemsRequest = async () => {
  const response = await axios.get(`${BASE_URL}/customers/${customer_name}/carts`);

  return response.data;
};

export const deleteItemFromCartRequest = async (productId) => {
  getCartItemsRequest().then(async (data) => {
    const cartId = data.find((item) => item.product_id === Number(productId)).cart_id;
    await axios.delete(`${BASE_URL}/customers/${customer_name}/carts/${cartId}`);
  });
  return;
};
