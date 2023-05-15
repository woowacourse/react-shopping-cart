import { fetchAPI } from './fetchAPI';

const getCartList = async () => {
  return await fetchAPI('/api/carts');
};

const postCartItem = async (productId: number, quantity: number) => {
  const data = {
    quantity,
    productId,
  };
  const jsonData = JSON.stringify(data);

  return await fetchAPI('/api/carts/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonData,
  });
};

export { getCartList, postCartItem };
