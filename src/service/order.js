import { requestTable } from '../api/request';

const requestCreateOrder = async content => {
  const requestOption = {
    method: 'POST',
    body: JSON.stringify(content),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  };

  return await requestTable.POST('/api/customers/hyuuunjukim/orders', requestOption);
};

const requestOrderList = async () => await requestTable.GET('/api/customers/hyuuunjukim/orders');

const requestOrder = async orderId => await requestTable.GET(`/api/customers/hyuuunjukim/orders/${orderId}`);

export { requestCreateOrder, requestOrderList, requestOrder };
