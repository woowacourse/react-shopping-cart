import { Loading, RequestError, Product } from "../../types";
import { ProductsActionType, productsActionType } from "../../actions/products";

interface InitialState extends Loading, RequestError {
  products: Product[];
}

const initialState: InitialState = {
  products: [],
  loading: false,
  requestErrorMessage: null,
};

const productsReducer = (state: InitialState = initialState, action: ProductsActionType) => {
  switch (action.type) {
    case productsActionType.get.request:
      return {
        ...state,
        loading: true,
      };

    case productsActionType.get.success:
      return {
        ...state,
        products: action.payload,
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
