import { API_PATH } from '../constants/api';
import { createAsyncThunk } from './utils/async';
import { reducerUtils } from './utils/reducer';
import { requestDeleteItem, requestGetItemList, requestInsertItem } from './utils/request';

const INSERT_SHOPPING_CART_ITEM = 'shoppingCart/INSERT_SHOPPING_CART_ITEM';
const INSERT_SHOPPING_CART_ITEM_SUCCESS = 'shoppingCart/INSERT_SHOPPING_CART_ITEM_SUCCESS';
const INSERT_SHOPPING_CART_ITEM_FAILURE = 'shoppingCart/INSERT_SHOPPING_CART_ITEM_FAILURE';

const DELETE_SHOPPING_CART_ITEM = 'shoppingCart/DELETE_SHOPPING_CART_ITEM';
const DELETE_SHOPPING_CART_ITEM_SUCCESS = 'shoppingCart/DELETE_SHOPPING_CART_ITEM_SUCCESS';
const DELETE_SHOPPING_CART_ITEM_FAILURE = 'shoppingCart/DELETE_SHOPPING_CART_ITEM_FAILURE';

const DELETE_CHECKED_SHOPPING_CART_ITEM_LIST = 'shoppingCart/DELETE_CHECKED_SHOPPING_CART_ITEM_LIST';
const DELETE_CHECKED_SHOPPING_CART_ITEM_LIST_SUCCESS = 'shoppingCart/DELETE_CHECKED_SHOPPING_CART_ITEM_LIST_SUCCESS';
const DELETE_CHECKED_SHOPPING_CART_ITEM_LIST_FAILURE = 'shoppingCart/DELETE_CHECKED_SHOPPING_CART_ITEM_LIST_FAILURE';

const GET_SHOPPING_CART_ITEM_LIST = 'shoppingCart/GET_SHOPPING_CART_ITEM_LIST';
const GET_SHOPPING_CART_ITEM_LIST_SUCCESS = 'shoppingCart/GET_SHOPPING_CART_ITEM_LIST_SUCCESS';
const GET_SHOPPING_CART_ITEM_LIST_FAILURE = 'shoppingCart/GET_SHOPPING_CART_ITEM_LIST_FAILURE';

const TOGGLE_SHOPPING_CART_ITEM = 'shoppingCart/TOGGLE_SHOPPING_CART_ITEM';
const TOGGLE_ALL_SHOPPING_CART_ITEM = 'shoppingCart/TOGGLE_ALL_SHOPPING_CART_ITEM';
const INCREASE_COUNT = 'shoppingCart/INCREASE_COUNT';
const DECREASE_COUNT = 'shoppingCart/DECREASE_COUNT';

const requestDeleteCheckedItemList = (checkedItemList) =>
  Promise.all(checkedItemList.map(({ id }) => requestDeleteItem(API_PATH.SHOPPING_CART_LIST, id)));

export const insertShoppingCartItem = createAsyncThunk(
  INSERT_SHOPPING_CART_ITEM,
  requestInsertItem.bind(null, API_PATH.SHOPPING_CART_LIST)
);

export const deleteShoppingCartItem = createAsyncThunk(
  DELETE_SHOPPING_CART_ITEM,
  requestDeleteItem.bind(null, API_PATH.SHOPPING_CART_LIST)
);

export const fetchShoppingCartList = createAsyncThunk(
  GET_SHOPPING_CART_ITEM_LIST,
  requestGetItemList.bind(null, API_PATH.SHOPPING_CART_LIST)
);

export const deleteCheckedShoppingCartList = createAsyncThunk(
  DELETE_CHECKED_SHOPPING_CART_ITEM_LIST,
  requestDeleteCheckedItemList
);

export const toggleShoppingCartItem = (shoppingCartItemId) => ({
  type: TOGGLE_SHOPPING_CART_ITEM,
  payload: shoppingCartItemId,
});

export const toggleAllShoppingCartItem = () => ({
  type: TOGGLE_ALL_SHOPPING_CART_ITEM,
});

export const increaseCount = (shoppingCartItemId) => ({
  type: INCREASE_COUNT,
  payload: shoppingCartItemId,
});

export const decreaseCount = (shoppingCartItemId) => ({
  type: DECREASE_COUNT,
  payload: shoppingCartItemId,
});

const initialState = {
  shoppingCartList: reducerUtils.initial([]),
  isAllShoppingCartItemChecked: true,
};

const shoppingCart = (state = initialState, action) => {
  switch (action.type) {
    case INSERT_SHOPPING_CART_ITEM:
      return {
        ...state,
        shoppingCartList: reducerUtils.loading(state.shoppingCartList.data),
      };
    case INSERT_SHOPPING_CART_ITEM_SUCCESS:
      return {
        ...state,
        shoppingCartList: reducerUtils.success([...state.shoppingCartList.data, action.payload]),
      };
    case INSERT_SHOPPING_CART_ITEM_FAILURE:
      return {
        ...state,
        shoppingCartList: reducerUtils.failure(state.shoppingCartList.data, action.payload),
      };

    case DELETE_SHOPPING_CART_ITEM:
      return {
        ...state,
        shoppingCartList: reducerUtils.loading(state.shoppingCartList.data),
      };
    case DELETE_SHOPPING_CART_ITEM_SUCCESS:
      return {
        ...state,
        shoppingCartList: reducerUtils.success(
          state.shoppingCartList.data.filter((shoppingCartItem) => shoppingCartItem.id !== action.payload)
        ),
      };
    case DELETE_SHOPPING_CART_ITEM_FAILURE:
      return {
        ...state,
        shoppingCartList: reducerUtils.failure(state.shoppingCartList.data, action.payload),
      };

    case DELETE_CHECKED_SHOPPING_CART_ITEM_LIST:
      return {
        ...state,
        shoppingCartList: reducerUtils.loading(state.shoppingCartList.data),
      };
    case DELETE_CHECKED_SHOPPING_CART_ITEM_LIST_SUCCESS:
      return {
        ...state,
        shoppingCartList: reducerUtils.success(
          state.shoppingCartList.data.filter((shoppingCartItem) => !shoppingCartItem.isChecked)
        ),
      };
    case DELETE_CHECKED_SHOPPING_CART_ITEM_LIST_FAILURE:
      return {
        ...state,
        shoppingCartList: reducerUtils.failure(state.shoppingCartList.data, action.payload),
      };

    case GET_SHOPPING_CART_ITEM_LIST: {
      return {
        ...state,
        shoppingCartList: reducerUtils.loading([]),
      };
    }
    case GET_SHOPPING_CART_ITEM_LIST_SUCCESS: {
      return {
        ...state,
        shoppingCartList: reducerUtils.success(action.payload),
      };
    }
    case GET_SHOPPING_CART_ITEM_LIST_FAILURE: {
      return {
        ...state,
        shoppingCartList: reducerUtils.failure([], action.payload),
      };
    }

    case TOGGLE_SHOPPING_CART_ITEM: {
      const changedShoppingCartList = state.shoppingCartList.data.map((shoppingCartItem) => {
        if (shoppingCartItem.id === action.payload) {
          return {
            ...shoppingCartItem,
            isChecked: !shoppingCartItem.isChecked,
          };
        }

        return shoppingCartItem;
      });

      const isAllShoppingCartItemChecked =
        changedShoppingCartList.length ===
        changedShoppingCartList.filter((shoppingCartItem) => shoppingCartItem.isChecked).length;

      return {
        ...state,
        shoppingCartList: reducerUtils.success(changedShoppingCartList),
        isAllShoppingCartItemChecked,
      };
    }

    case TOGGLE_ALL_SHOPPING_CART_ITEM: {
      const changedShoppingCartList = state.shoppingCartList.data.map((shoppingCartItem) => ({
        ...shoppingCartItem,
        isChecked: !state.isAllShoppingCartItemChecked,
      }));

      return {
        ...state,
        shoppingCartList: reducerUtils.success(changedShoppingCartList),
        isAllShoppingCartItemChecked: !state.isAllShoppingCartItemChecked,
      };
    }

    case INCREASE_COUNT: {
      const changedShoppingCartList = state.shoppingCartList.data.map((shoppingCartItem) => {
        if (shoppingCartItem.id === action.payload) {
          return {
            ...shoppingCartItem,
            count: shoppingCartItem.count + 1,
          };
        }
        return shoppingCartItem;
      });

      return {
        ...state,
        shoppingCartList: reducerUtils.success(changedShoppingCartList),
      };
    }

    case DECREASE_COUNT: {
      const changedShoppingCartList = state.shoppingCartList.data.map((shoppingCartItem) => {
        if (shoppingCartItem.id === action.payload) {
          return {
            ...shoppingCartItem,
            count: shoppingCartItem.count - 1,
          };
        }
        return shoppingCartItem;
      });

      return {
        ...state,
        shoppingCartList: reducerUtils.success(changedShoppingCartList),
      };
    }
    default:
      return state;
  }
};

export default shoppingCart;
