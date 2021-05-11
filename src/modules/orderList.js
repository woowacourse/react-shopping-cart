const INSERT_ORDER_ITEM_LIST = 'orderList/INSERT_ORDER_ITEM_LIST';

export const insertOrderItemList = (orderItemList) => async (dispatch) => {
  await fetch('http://localhost:4000/orderItemList', {
    method: 'POST',
    body: JSON.stringify(orderItemList),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  dispatch({ type: INSERT_ORDER_ITEM_LIST, payload: orderItemList });
};

const initialState = {
  orderItemList: [],
};

const orderList = (state = initialState, action) => {
  switch (action.type) {
    case INSERT_ORDER_ITEM_LIST:
      return {
        ...state,
        orderItemList: [
          {
            orderNumber: new Date().getTime(),
            itemList: action.payload,
          },
          ...state.orderItemList,
        ],
      };
    default:
      return state;
  }
};

export default orderList;
