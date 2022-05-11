import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import ReduxLogger from 'redux-logger';
import reducers from 'reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(reducers, composeWithDevTools(applyMiddleware(ReduxThunk, ReduxLogger)));
