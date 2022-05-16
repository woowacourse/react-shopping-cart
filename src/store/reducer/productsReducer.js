import { ACTION_TYPE } from 'store/action/productsActions';

const initialState = [];

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.UPDATE_PRODUCTS:
      return state.concat(action.products);
    case ACTION_TYPE.CLEAR_PRODUCTS:
      return [];
    default:
      return state;
  }
};

export default productsReducer;
