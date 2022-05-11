import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import productsReducer from 'store/reducer/productsReducer';
import ReduxThunk from 'redux-thunk';

const store = createStore(productsReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

export { store };
