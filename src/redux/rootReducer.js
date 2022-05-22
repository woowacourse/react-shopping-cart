import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { productListReducer, cartListReducer } from "@/redux/reducers";

const rootReducer = combineReducers({
  productListState: productListReducer,
  cartListState: cartListReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
