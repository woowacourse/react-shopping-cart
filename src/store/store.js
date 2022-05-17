import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import productsReducer from 'store/reducer/productsReducer';
import { selectReducer } from './reducer/selectReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  selectedProductId: selectReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

export { store };
