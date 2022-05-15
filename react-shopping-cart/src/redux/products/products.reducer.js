import productActionType from "redux/products/products.types";

const INITIAL_STATE = {
  loading: false,
  products: [],
  detailProduct: null,
  error: null,
};

const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productActionType.fetchProductDetailStart:
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
        error: null,
      };
    case productActionType.fetchProductDetailSuccess:
      return {
        ...state,
        loading: false,
        detailProduct: action.payload,
        error: null,
      };
    case productActionType.fetchProductDetailError:
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
