const ADD_PAYMENT_ITEMS = 'counter/ADD_PAYMENT_ITEMS';

export const addPaymentItems = (paymentItems) => ({ type: ADD_PAYMENT_ITEMS, payload: paymentItems });

const initialState = [];

const addItem = (state, items) => {
  const filteredItems = items.filter((item) => item.checked);

  return state.concat(filteredItems);
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PAYMENT_ITEMS:
      return addItem(state, action.payload);
    default:
      return state;
  }
};

export default paymentReducer;
