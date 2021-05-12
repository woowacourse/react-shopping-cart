import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import rootReducer from './reducer';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const persistedStore = persistStore(store);

export { store, persistedStore };
