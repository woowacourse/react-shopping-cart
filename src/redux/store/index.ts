import { applyMiddleware, createStore } from 'redux';

import ReduxThunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import rootReducer from 'redux/reducers';

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const persistor = persistStore(store);

export { store, persistor };
