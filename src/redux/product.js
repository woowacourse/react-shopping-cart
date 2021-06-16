import { API_PATH, RETURN_TYPE } from '../constants/api';
import { httpClient } from '../request/httpClient';

const FETCH_PRODUCT_LIST = 'product/FETCH_PRODUCT_LIST';
const FETCH_PRODUCT_ITEM = 'product/FETCH_PRODUCT_ITEM';

export const fetchProductList = () => async (dispatch) => {
  try {
    const productList = await httpClient.get({ path: API_PATH.PRODUCT_LIST, returnType: RETURN_TYPE.JSON });

    dispatch({ type: FETCH_PRODUCT_LIST, payload: productList });
  } catch (error) {
    console.error(error);
  }
};

export const fetchProductItem = (id) => async (dispatch) => {
  try {
    const productItem = await httpClient.get({ path: `${API_PATH.PRODUCT_LIST}/${id}`, returnType: RETURN_TYPE.JSON });

    dispatch({ type: FETCH_PRODUCT_ITEM, payload: productItem });
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  productList: [],
  productItem: [],
};

const product = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload,
      };
    case FETCH_PRODUCT_ITEM:
      return {
        productItem: action.payload,
      };
    default:
      return state;
  }
};

export default product;
