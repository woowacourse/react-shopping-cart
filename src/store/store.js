import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import productReducer from 'store/reducer/productReducer';
import cartReducer from './reducer/cartReducer';
import snackBarReducer from './reducer/snackBarReducer';

const rootReducer = combineReducers({
  product: productReducer,
  snackBar: snackBarReducer,
  shoppingCart: cartReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

export { store };
