import { createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

const productInfoListReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT":
      return action.payload.products;
    default:
      return state;
  }
};

const productInfoListStore = createStore(
  productInfoListReducer,
  composeWithDevTools()
);

export { productInfoListStore };
