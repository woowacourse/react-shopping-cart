import { applyMiddleware, combineReducers, createStore } from 'redux';
import { productsReducer } from './products/reducer';
import { layoutReducer } from './layout/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { ProductsAction } from './products/type';
import { LayoutAction } from './layout/type';
import { Dispatch } from 'react';

const rootReducer = combineReducers({ products: productsReducer, layout: layoutReducer });

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof rootReducer>;

// TODO : Thunk Dispatch 도 타입 부여 하는 방법 더 알아보기
export type AppDispatch = Dispatch<ProductsAction | LayoutAction | Function>;

export default store;
