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

const patchCartItem = async (productId: number, quantity: number) => {
  const data = {
    quantity,
  };
  const jsonData = JSON.stringify(data);

  return await fetchAPI(`/api/carts/change/${productId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonData,
  });
};

const deleteCartItem = async (productId: number) => {
  return await fetchAPI(`/api/carts/remove/${productId}`, {
    method: 'DELETE',
  });
};

export { getCartList, postCartItem, patchCartItem, deleteCartItem };
