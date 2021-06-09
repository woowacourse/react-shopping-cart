import produce from 'immer';
import { ACTION_TYPE, FALLBACK, PRODUCT } from '../constants';
import { combineReducers } from 'redux';

const initialState = {
  fetchedProducts: [],
  productDetail: {},
};

const setProducts = (state, products) => {
  const updater = produce(draft => {
    draft.fetchedProducts = products;
  });

  return updater(state);
};

const getProductDetail = (state, productDetail) => {
  const updater = produce(draft => {
    draft.productDetail = productDetail;
  });

  return updater(state);
};

const resetProductDetail = state => {
  const updater = produce(draft => {
    draft.productDetail = { ...state, image_url: FALLBACK.PRODUCT.LOADING };
  });

  return updater(state);
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.PRODUCTS.SET_PRODUCTS:
      return setProducts(state, action.fetchedProducts);

    case ACTION_TYPE.PRODUCTS.GET_PRODUCT_DETAIL:
      return getProductDetail(state, action.productDetail);

    case ACTION_TYPE.PRODUCTS.RESET_PRODUCT_DETAIL:
      return resetProductDetail(state);

    default:
      return state;
  }
};

export default combineReducers({ product: productReducer });
