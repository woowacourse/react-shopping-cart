import { combineReducers } from 'redux';

import { cartListReducer } from './cartList/reducer';
import { itemReducer } from './item/reducer';
import { itemListReducer } from './itemList/reducer';

const rootReducer = combineReducers({
  item: itemReducer,
  itemList: itemListReducer,
  cartList: cartListReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
