import { TYPE } from 'store/products/action';

const initialState = {
  loading: true,
  products: [],
  productsError: null,
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.PRODUCTS_LOAD:
      return { ...state, products: action.payload, productsError: null };
    case TYPE.LOADING:
      return { ...state, loading: action.payload };
    case TYPE.ERROR:
      return { ...state, productsError: action.payload };
    default:
      return state;
  }
};
