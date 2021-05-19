import {
  loadData,
  loadSortedData,
  addData,
  PRODUCT_LIST,
  ORDER_LIST,
  ORDER_ID,
  DESC,
} from '../firebase';

export const request = {
  get: {
    productList: async () =>
      await loadData({
        table: PRODUCT_LIST,
      }),

    orderList: async () =>
      await loadSortedData({
        table: ORDER_LIST,
        sortField: ORDER_ID,
        sortDirection: DESC,
      }),
  },
  post: {
    order: (orderId, orderItems) => {
      addData({
        table: ORDER_LIST,
        key: orderId,
        value: { orderId, orderItems },
      });
    },
  },
};
