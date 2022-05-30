import { Action, Product } from '../../types';
import { TYPES } from '../actions';

const initialState: {
  isLoading: boolean;
  error: any;
  productDetail: Product | null;
} = {
  isLoading: false,
  error: null,
  productDetail: null,
};

const productDetail = (state = initialState, action: Action) => {
  switch (action.type) {
    case `${TYPES.GET_PRODUCT_DETAIL}_PENDING`: {
      return { ...state, isLoading: true, error: null };
    }
    case `${TYPES.GET_PRODUCT_DETAIL}_FULFILLED`: {
      return { ...state, isLoading: false, productDetail: action.payload };
    }
    case `${TYPES.GET_PRODUCT_DETAIL}_REJECTED`: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case `${TYPES.ADD_ITEM_TO_CART}_FULFILLED`: {
      const isAddedToCart = action.payload
        .map(({ product }: { product: Product }) => product.id)
        .includes(state.productDetail?.id);

      return {
        ...state,
        productDetail: { ...state.productDetail, isAddedToCart },
      };
    }
    default:
      return state;
  }
};

export default productDetail;
export { initialState };
