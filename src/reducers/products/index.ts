import { ProductsObject, RequestError } from '../../interface';
import { productsActionType } from '../../actions/products';

const initialState: ProductsObject & RequestError = {
  products: {},
  requestErrorMessage: null,
};

const productsReducer = (state = initialState, action: productsActionType) => {
  switch (action.type) {
    case 'products/get/success':
      return {
        ...state,
        products: { ...action.payload.products },
        requestErrorMessage: null,
      };

    case 'products/get/failure':
      return {
        ...state,
        requestErrorMessage: action.payload.requestErrorMessage,
      };

    default:
      return state;
  }
};

export default productsReducer;
export { initialState };
