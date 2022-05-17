import { applyMiddleware, createStore } from 'redux';

import ReduxThunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from 'redux/reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(promiseMiddleware, ReduxThunk)
);

const persistor = persistStore(store);

export { store, persistor };
