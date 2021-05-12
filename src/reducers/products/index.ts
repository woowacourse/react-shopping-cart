import { ProductsObject, RequestError } from "../../interface";
import { ProductsActionType, productsActionType } from "../../actions/products";

const initialState: ProductsObject & RequestError = {
  products: {},
  requestErrorMessage: null,
};

const productsReducer = (state = initialState, action: ProductsActionType) => {
  switch (action.type) {
    case productsActionType.get.success:
      return {
        ...state,
        products: { ...action.payload.products },
        requestErrorMessage: null,
      };
    case productsActionType.get.failure:
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
