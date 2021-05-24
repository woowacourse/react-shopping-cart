const BASE_URL = 'https://shopping-cart.techcourse.co.kr';

const requestCreateOrder = async content => {
  const requestOption = {
    method: 'POST',
    body: JSON.stringify(content),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  };

  await fetch(`${BASE_URL}/api/customers/hyuuunjukim/orders`, requestOption);
};

const requestOrderList = () => fetch(`${BASE_URL}/api/customers/hyuuunjukim/orders`);
const requestOrder = orderId => fetch(`${BASE_URL}/api/customers/hyuuunjukim/orders/${orderId}`);

export { requestCreateOrder, requestOrderList, requestOrder };
