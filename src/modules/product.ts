import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { URL, STATUS_CODE } from '../constants';

const GET_PRODUCTS_REQUEST = 'product/GET_PRODUCT_REQUEST';
const GET_PRODUCTS_SUCCESS = 'product/GET_PRODUCT_SUCCESS';
const GET_PRODUCTS_FAILURE = 'product/GET_PRODUCT_FAILURE';

interface ProductsRequestAction {
  type: typeof GET_PRODUCTS_REQUEST;
}

interface ProductSuccessAction {
  type: typeof GET_PRODUCTS_SUCCESS;
  payload: Product[];
}

interface ProductFailureAction {
  type: typeof GET_PRODUCTS_FAILURE;
  error: AxiosError;
}

type ProductAction = ProductsRequestAction | ProductSuccessAction | ProductFailureAction;

export interface productState {
  loading: boolean;
  error: AxiosError | null;
  products: Product[];
}

export const getProducts = () => async (dispatch: Dispatch<ProductAction>) => {
  dispatch({ type: GET_PRODUCTS_REQUEST });
  try {
    const response = await axios.get(URL.PRODUCTS);
    console.log(response);

    if (response.status !== STATUS_CODE.GET_SUCCESS) {
      throw new Error('');
    }

    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error(error);
    dispatch({ type: GET_PRODUCTS_FAILURE, error });
  }
};

const initialState: productState = {
  loading: false,
  error: null,
  products: [],
};

export const productReducer = (state: productState = initialState, action: ProductAction): productState => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
