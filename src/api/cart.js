import { request } from 'lib/requestUtils';

const requestGetCartList = () =>
  request('/cart', {
    method: 'GET',
  });

const requestAddCart = ({ id, image, name, price, quantity, isChecked }) =>
  request('/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      product: id,
      image,
      name,
      price,
      quantity,
      isChecked,
    }),
  });

const requestEditCartItem = async (id, quantity) => {
  const response = await request(`/cart/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      quantity,
    }),
  });

  return response;
};

const requestRemoveCartItem = async (id) => {
  const response = await request(`/cart/${id}`, {
    method: 'DELETE',
  });

  return response;
};

export { requestGetCartList, requestAddCart, requestEditCartItem, requestRemoveCartItem };
