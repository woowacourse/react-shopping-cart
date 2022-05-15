import { createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

const PRODUCT_LIST_ACTION = {
  INIT: "INIT",
};

export const initProductList = (payload) => ({
  type: PRODUCT_LIST_ACTION.INIT,
  payload,
});

const productListReducer = (state = [], action) => {
  if (action.type === PRODUCT_LIST_ACTION.INIT) {
    return action.payload.products;
  }
  return state;
};

const store = createStore(productListReducer, composeWithDevTools());

export { store };
