import productActionType from "./products.types";

const INITIAL_STATE = {
  loading: false,
  products: [],
  error: null,
};

const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productActionType.fetchProductsStart:
      return {
        ...state,
        loading: true,
      };
    case productActionType.fetchProductsSuccess:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case productActionType.fetchProductsError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export default productsReducer;
