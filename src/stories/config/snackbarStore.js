import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import ReduxLogger from 'redux-logger';
import snackbar from './snackbarReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(
  combineReducers({ snackbar }),
  composeWithDevTools(applyMiddleware(ReduxThunk, ReduxLogger)),
);
