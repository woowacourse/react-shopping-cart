import reducers from 'reducers';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

export default createStore(reducers, composeWithDevTools(applyMiddleware(ReduxThunk, ReduxLogger)));
