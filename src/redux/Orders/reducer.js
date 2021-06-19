import { SET_ORDER_SUCCESS } from './actions';

const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ORDER_SUCCESS:
      return [
        ...state,
        {
          id: state.length > 0 ? state[state.length - 1].id + 1 : 0,
          products: action.products,
        },
      ];

    default:
      return state;
  }
};

export default ordersReducer;
