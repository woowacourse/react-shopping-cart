import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import ReduxThunk from "redux-thunk";

const PRODUCT_LIST_ACTION = {
  INIT: "productList/INIT",
};

export const initializeProductList = (payload) => ({
  type: PRODUCT_LIST_ACTION.INIT,
  payload,
});

const reducer = (state = [], action) => {
  switch (action.type) {
    case PRODUCT_LIST_ACTION.INIT:
      return action.payload.products;
    default:
      return state;
  }
};

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

export default reducer;
