import produce from 'immer';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  ACTIVATE_LOADING_SPINNER,
  DEACTIVATE_LOADING_SPINNER,
  GET_MY_SHOPPING_CART,
  UPDATE_CHECKED_PRODUCT_ITEMS,
  UPDATE_MY_SHOPPING_CART_ITEMS,
  UPDATE_PRODUCT_ITEMS,
} from './actionType';

const myShoppingCartState = {
  myShoppingCart: { id: null, productIdList: [] },
};

const loadingState = {
  loading: false,
};

const productListState = {
  productList: [],
};

const checkedProductState = {
  checkedProductList: [],
};

const checkedProductReducer = (state = checkedProductState, action) => {
  switch (action.type) {
    case UPDATE_CHECKED_PRODUCT_ITEMS: {
      return {
        ...state,
        checkedProductList: action.productItems,
      };
    }

    default:
      return state;
  }
};

const myShoppingCartReducer = (state = myShoppingCartState, action) => {
  switch (action.type) {
    case UPDATE_MY_SHOPPING_CART_ITEMS: {
      return produce(state, draft => {
        draft.myShoppingCart.productIdList = action.productIdList;
      });
    }
    case GET_MY_SHOPPING_CART: {
      return produce(state, draft => {
        draft.myShoppingCart = action.myShoppingCart;
      });
    }
    default:
      return state;
  }
};

const loadingReducer = (state = loadingState, action) => {
  switch (action.type) {
    case ACTIVATE_LOADING_SPINNER: {
      return { ...state, loading: true };
    }
    case DEACTIVATE_LOADING_SPINNER: {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

const productListReducer = (state = productListState, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_ITEMS: {
      return { ...state, productList: action.productItems };
    }

    default:
      return state;
  }
};

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  myShoppingCartReducer,
  loadingReducer,
  productListReducer,
  checkedProductReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
