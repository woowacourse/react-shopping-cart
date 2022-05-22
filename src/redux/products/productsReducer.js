import ACTION_TYPE from 'redux/products/productsActions';

const initialState = [];

const productsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPE.UPDATE_PRODUCTS:
      return state.concat(payload);
    default:
      return state;
  }
};

export default productsReducer;

export { initialState };
