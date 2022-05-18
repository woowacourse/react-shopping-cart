import { START_PRODUCT, SET_PRODUCT, RESET_PRODUCT } from 'store/product/actionTypes';
import { resetProduct, setProduct, startProduct } from './actions';
import { ProductData } from 'types';

interface ProductState {
  currentProduct: ProductData;
  isLoading: boolean;
}

type ProductAction =
  | ReturnType<typeof startProduct>
  | ReturnType<typeof setProduct>
  | ReturnType<typeof resetProduct>;

const initialState: ProductState = {
  currentProduct: {
    id: 0,
    name: '',
    price: 0,
    thumbnail: '',
  },
  isLoading: false,
};

const productReducer = (state: ProductState = initialState, action: ProductAction) => {
  if (action.type === START_PRODUCT) {
    return {
      ...state,
      isLoading: true,
    };
  }

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
