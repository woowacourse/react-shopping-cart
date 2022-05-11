import { PRODUCTS_ACTIONS } from 'actions/actions';

const initialState = {
  items: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCTS_ACTIONS.UPDATE_PRODUCT_LIST:
      return { ...state, items: [...state.items, ...payload] };

    default:
      return state;
  }
};
