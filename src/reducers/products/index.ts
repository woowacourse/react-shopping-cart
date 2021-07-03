import { ProductsObject, RequestError } from "../../interface";
import { ProductsActionType, productsActionType } from "../../actions/products";

const initialState: ProductsObject = {};

const productsReducer = (state = initialState, action: ProductsActionType) => {
  switch (action.type) {
    case productsActionType.get.success: 
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
export { initialState };
