import { applyMiddleware, createStore } from 'redux';

import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from 'redux/reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(promiseMiddleware, ReduxThunk)
);

export default store;
