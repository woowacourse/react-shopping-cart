import { ProductsObject, Loading, RequestError } from "../../types";
import { ProductsActionType, productsActionType } from "../../actions/products";

const initialState: ProductsObject & Loading & RequestError = {
  products: {},
  loading: false,
  requestErrorMessage: null,
};

const productsReducer = (state: ProductsObject & Loading & RequestError = initialState, action: ProductsActionType) => {
  switch (action.type) {
    case productsActionType.get.request:
      return {
        ...state,
        loading: true,
      };

    case productsActionType.get.success:
      return {
        ...state,
        products: { ...action.payload.products },
        loading: false,
        requestErrorMessage: null,
      };

    case productsActionType.get.failure:
      return {
        ...state,
        loading: false,
        requestErrorMessage: action.payload.requestErrorMessage,
      };

    default:
      return state;
  }
};

export default productsReducer;
export { initialState };
