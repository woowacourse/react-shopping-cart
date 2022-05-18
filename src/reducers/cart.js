import { CARTS_ACTIONS } from 'actions/types';

const initialState = {
  items: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CARTS_ACTIONS.ADD_CART_LIST:
      return { ...state, items: [...state.items, payload] };

    default:
      return state;
  }
};
