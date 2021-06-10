import { requestTable } from '../api/request';

const requestShoppingCartList = async () => await requestTable.GET('/api/customers/hyuuunjukim/carts');

const requestAddShoppingCartItem = async content => {
  const requestOption = {
    method: 'POST',
    body: JSON.stringify(content),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  };

  return await requestTable.POST('/api/customers/hyuuunjukim/carts', requestOption);
};

const requestDeleteShoppingCartItem = async targetCartId => {
  const requestOption = {
    method: 'DELETE',
  };

  await requestTable.DELETE(`/api/customers/hyuuunjukim/carts/${targetCartId}`, requestOption);
};

export { requestAddShoppingCartItem, requestShoppingCartList, requestDeleteShoppingCartItem };
