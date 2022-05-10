import { createStore } from 'redux';

const initialState = { products: { data: [], loading: false, error: null } };

const productsReducer = (state = initialState, action) => {
  if (action.type === 'GET_PRODUCTS') {
    return { ...state, products: { ...state.products, loading: true } };
  }
  if (action.type === 'GET_PRODUCTS_SUCCESS') {
    return {
      ...state,
      products: { ...state.products, loading: false, data: action.payload },
    };
  }
  if (action.type === 'GET_PRODUCTS_ERROR') {
    return {
      ...state,
      products: { ...state.products, loading: false, error: action.payload },
    };
  }

  return state;
};

const store = createStore(productsReducer);

export default store;
