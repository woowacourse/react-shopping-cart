import { applyMiddleware, combineReducers, createStore } from 'redux';
import { productsReducer } from './products/reducer';
import { cartReducer } from './cart/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { ProductsAction } from './products/type';
import { Dispatch } from 'react';
import { CartAction } from './cart/type';

const rootReducer = combineReducers({ products: productsReducer, cart: cartReducer });

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof rootReducer>;

// TODO : Thunk Dispatch 도 타입 부여 하는 방법 더 알아보기
export type AppDispatch = Dispatch<ProductsAction | CartAction | Function>;

export default store;
