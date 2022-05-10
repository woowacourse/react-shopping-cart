import { createStore, combineReducers } from "redux";

import cartReducer from "./modules/cart";

const rootReducer = combineReducers({ cartReducer });

const store = createStore(rootReducer);

export default store;
