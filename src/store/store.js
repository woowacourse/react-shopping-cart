import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import productsReducer from 'store/reducer/productsReducer';

const store = createStore(productsReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

export { store };
