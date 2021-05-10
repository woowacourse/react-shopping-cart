import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));

const store = createStore(rootReducer, composeEnhancer);

sagaMiddleware.run(rootSaga);

type RootState = ReturnType<typeof store.getState>;

export default store;
export { RootState };
