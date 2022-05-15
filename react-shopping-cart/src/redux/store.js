import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';
import rootReducer from './root-redux';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [logger, sagaMiddleware];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
sagaMiddleware.run(rootSaga);

export { store };
