import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from 'reducers/rootReducer';

const configureStore = () => {
  const store = createStore(
    rootReducer(),
    composeWithDevTools(applyMiddleware(ReduxThunk)),
  );
  return store;
};

export default configureStore;
