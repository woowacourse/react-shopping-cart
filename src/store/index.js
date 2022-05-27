import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  cartReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

export { store };
