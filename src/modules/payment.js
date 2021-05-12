const ADD_PAYMENT_ITEMS = 'counter/ADD_PAYMENT_ITEMS';

export const addPaymentItems = (paymentItems) => ({ type: ADD_PAYMENT_ITEMS, payload: paymentItems });

const initialState = [];

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PAYMENT_ITEMS:
      return action.payload;
    default:
      return state;
  }
};

export default paymentReducer;
