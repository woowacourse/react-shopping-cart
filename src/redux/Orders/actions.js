import { API_URL } from '../../constants/api';
import { ERROR_MESSAGE } from '../../constants/message';
import { snakeToCamelConverter } from '../../utils/converter';

export const GET_ORDERS_PENDING = 'orders/get_order/pending';
export const GET_ORDERS_SUCCESS = 'orders/get_order/success';
export const GET_ORDERS_ERROR = 'orders/get_order/error';

export const SET_ORDER_PENDING = 'orders/set_order/pending';
export const SET_ORDER_SUCCESS = 'orders/set_order/success';
export const SET_ORDER_ERROR = 'orders/set_order/error';

export const RESET_ORDERS = 'orders/reset_orders';

export const getOrders = () => (dispatch, getState) => {
  dispatch({ type: GET_ORDERS_PENDING });
  return fetch(API_URL.ORDERS)
    .then((response) => {
      if (!response.ok) {
        throw new Error(ERROR_MESSAGE.FAILED_TO_GET_ORDERS);
      }

      return response.json();
    })
    .then((data) => {
      const camelData = data.map((order) =>
        Object.entries(order).reduce((prev, cur) => {
          const [key, value] = cur;
          const convertedKey = snakeToCamelConverter(key);

          if (key === 'order_details') {
            prev[convertedKey] = value.map((product) =>
              Object.entries(product).reduce((pre, cur) => {
                const [innerKey, innerValue] = cur;
                pre[snakeToCamelConverter(innerKey)] = innerValue;

                return pre;
              }, {})
            );
          } else {
            prev[convertedKey] = value;
          }

          return prev;
        }, {})
      );

      dispatch({
        type: GET_ORDERS_SUCCESS,
        order: camelData,
      });
    })
    .catch((e) => {
      throw e;
    });
};

export const setOrder = (products) => (dispatch, getState) => {
  const order = products.map((product) => {
    const productOrderData = {
      cart_id: product.cartId,
      quantity: product.quantity,
    };

    return productOrderData;
  });

  dispatch({ type: SET_ORDER_PENDING });
  return fetch(API_URL.ORDERS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(ERROR_MESSAGE.FAILED_TO_SET_ORDER);
      }

      if (response.status === 201) {
        const responseLocation = response.headers.get('location');
        const orderId = responseLocation.slice(responseLocation.lastIndexOf('/') + 1);
        const orderItem = {
          orderId: Number(orderId),
          orderDetails: products.map((product) => {
            delete product.cartId;
            delete product.isChecked;

            return product;
          }),
        };

        dispatch({
          type: SET_ORDER_SUCCESS,
          orderItem,
        });
      }
    })
    .catch((e) => {
      throw e;
    });
};

export const resetOrders = () => {
  return {
    type: RESET_ORDERS,
  };
};
