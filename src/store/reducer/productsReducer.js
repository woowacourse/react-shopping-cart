import { ACTION_TYPE } from 'store/action/productsActions';

const initialState = [];

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.UPDATE_PRODUCTS:
      return state.concat(action.products);
    default:
      return state;
  }
};

export default productsReducer;
