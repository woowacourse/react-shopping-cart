import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import persistedReducer from './reducers';

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

const persistedStore = persistStore(store);

export { store, persistedStore };
