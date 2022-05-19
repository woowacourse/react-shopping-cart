import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import productsReducer from 'store/reducer/productsReducer';
import cartReducer from './reducer/cartReducer';
import selectReducer from './reducer/selectReducer';
import snackBarReducer from './reducer/snackBarReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  selectedProductId: selectReducer,
  snackBar: snackBarReducer,
  shoppingCart: cartReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

export { store };
