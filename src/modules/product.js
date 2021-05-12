import { httpClient } from '../request/httpClient';

const FETCH_PRODUCT_LIST = 'product/FETCH_PRODUCT_LIST';

export const fetchProductList = () => async (dispatch) => {
  try {
    const productList = await httpClient.get({ path: 'productList', returnType: 'json' });

    dispatch({ type: FETCH_PRODUCT_LIST, payload: productList });
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  productList: [],
};

const product = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload,
      };
    default:
      return state;
  }
};

export default product;
