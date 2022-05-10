import { combineReducers } from 'redux';
import { itemListReducer } from './itemListReducer';

const rootReducer = combineReducers({ itemListReducer });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
