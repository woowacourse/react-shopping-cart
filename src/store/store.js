import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from 'store/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));
store.subscribe(() => store.getState());

export default store;
