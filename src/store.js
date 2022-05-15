import { createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

const PRODUCT_INFO_LIST_ACTION_TYPE = {
  INIT: "INIT",
};

export const initializeProductInfoList = (payload) => ({
  type: PRODUCT_INFO_LIST_ACTION_TYPE.INIT,
  payload,
});

const productInfoListReducer = (state = [], action) => {
  switch (action.type) {
    case PRODUCT_INFO_LIST_ACTION_TYPE.INIT:
      return action.payload.products;
    default:
      return state;
  }
};

const store = createStore(productInfoListReducer, composeWithDevTools());

export { store };
