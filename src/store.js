import { createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

const PRODUCT_LIST_ACTION_TYPE = {
  INIT: "INIT",
};

export const initializeProductList = (payload) => ({
  type: PRODUCT_LIST_ACTION_TYPE.INIT,
  payload,
});

const productListReducer = (state = [], action) => {
  switch (action.type) {
    case PRODUCT_LIST_ACTION_TYPE.INIT:
      return action.payload.products;
    default:
      return state;
  }
};

const store = createStore(productListReducer, composeWithDevTools());

export { store };
