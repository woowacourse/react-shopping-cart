const SET_PRODUCT = 'product/SET_PRODUCT';
const RESET_PRODUCT = 'product/RESET_PRODUCT';

export const setProduct = (product) => ({
  type: SET_PRODUCT,
  payload: { product },
});

export const resetProduct = () => ({
  type: RESET_PRODUCT,
});

const initialState = {
  currentProduct: null,
  isLoading: true,
};

const productReducer = (state = initialState, action) => {
  if (action.type === SET_PRODUCT) {
    return {
      ...state,
      currentProduct: action.payload.product,
      isLoading: false,
    };
  }

  if (action.type === RESET_PRODUCT) {
    return initialState;
  }

  return state;
};

export default productReducer;
