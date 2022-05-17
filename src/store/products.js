import axios from 'axios';
import { SERVER_URL, PATH } from 'constants';

const TYPE = {
  PRODUCTS_LOAD: 'products/load',
};

const initialState = {
  products: [],
};

const actionCreators = {
  loadProducts: (payload) => ({ type: TYPE.PRODUCTS_LOAD, payload }),
};

export const loadProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${SERVER_URL}${PATH.PRODUCTS}`);

    dispatch(actionCreators.loadProducts(data));
  } catch (error) {
    console.log(error);
  }
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.PRODUCTS_LOAD:
      return { ...state, products: action.payload };
    default:
      return state;
  }
};
