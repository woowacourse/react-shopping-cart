import { PRODUCTS_ACTIONS } from 'actions/types';

const initialState = {
  items: [],
  errorMessage: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCTS_ACTIONS.UPDATE_PRODUCT_LIST_SUCCESS:
      return { ...state, items: [...state.items, ...payload] };

    case PRODUCTS_ACTIONS.UPDATE_PRODUCT_LIST_FAILURE:
      return { ...state, errorMessage: payload };

    default:
      return state;
  }
};
