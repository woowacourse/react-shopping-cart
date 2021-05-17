import {
  DECREASE_COUNT,
  DELETE_CHECKED_SHOPPING_CART_ITEM_LIST,
  DELETE_CHECKED_SHOPPING_CART_ITEM_LIST_FAILURE,
  DELETE_CHECKED_SHOPPING_CART_ITEM_LIST_SUCCESS,
  DELETE_SHOPPING_CART_ITEM,
  DELETE_SHOPPING_CART_ITEM_FAILURE,
  DELETE_SHOPPING_CART_ITEM_SUCCESS,
  GET_SHOPPING_CART_ITEM_LIST,
  GET_SHOPPING_CART_ITEM_LIST_FAILURE,
  GET_SHOPPING_CART_ITEM_LIST_SUCCESS,
  INCREASE_COUNT,
  INSERT_SHOPPING_CART_ITEM,
  INSERT_SHOPPING_CART_ITEM_FAILURE,
  INSERT_SHOPPING_CART_ITEM_SUCCESS,
  TOGGLE_ALL_SHOPPING_CART_ITEM,
  TOGGLE_SHOPPING_CART_ITEM,
} from '../actions/shoppingCartActions';
import { reducerUtils } from '../utils/reducer';

const initialState = {
  shoppingCartItemList: reducerUtils.initial([]),
  isAllShoppingCartItemChecked: true,
};

const shoppingCartReducers = (state = initialState, action) => {
  switch (action.type) {
    case INSERT_SHOPPING_CART_ITEM:
      return {
        ...state,
        shoppingCartItemList: reducerUtils.loading(state.shoppingCartItemList.data),
      };
    case INSERT_SHOPPING_CART_ITEM_SUCCESS:
      return {
        ...state,
        shoppingCartItemList: reducerUtils.success([...state.shoppingCartItemList.data, action.payload]),
      };
    case INSERT_SHOPPING_CART_ITEM_FAILURE:
      return {
        ...state,
        shoppingCartItemList: reducerUtils.failure(state.shoppingCartItemList.data, action.payload),
      };

    case DELETE_SHOPPING_CART_ITEM:
      return {
        ...state,
        shoppingCartItemList: reducerUtils.loading(state.shoppingCartItemList.data),
      };
    case DELETE_SHOPPING_CART_ITEM_SUCCESS:
      return {
        ...state,
        shoppingCartItemList: reducerUtils.success(
          state.shoppingCartItemList.data.filter((shoppingCartItem) => shoppingCartItem.cart_id !== action.payload)
        ),
      };
    case DELETE_SHOPPING_CART_ITEM_FAILURE:
      return {
        ...state,
        shoppingCartItemList: reducerUtils.failure(state.shoppingCartItemList.data, action.payload),
      };

    case DELETE_CHECKED_SHOPPING_CART_ITEM_LIST:
      return {
        ...state,
        shoppingCartItemList: reducerUtils.loading(state.shoppingCartItemList.data),
      };
    case DELETE_CHECKED_SHOPPING_CART_ITEM_LIST_SUCCESS:
      return {
        ...state,
        shoppingCartItemList: reducerUtils.success(
          state.shoppingCartItemList.data.filter((shoppingCartItem) => !shoppingCartItem.isChecked)
        ),
      };
    case DELETE_CHECKED_SHOPPING_CART_ITEM_LIST_FAILURE:
      return {
        ...state,
        shoppingCartItemList: reducerUtils.failure(state.shoppingCartItemList.data, action.payload),
      };

    case GET_SHOPPING_CART_ITEM_LIST: {
      return {
        ...state,
        shoppingCartItemList: reducerUtils.loading([]),
      };
    }
    case GET_SHOPPING_CART_ITEM_LIST_SUCCESS: {
      return {
        ...state,
        shoppingCartItemList: reducerUtils.success(
          action.payload.map((item) => ({ ...item, count: 1, isChecked: true }))
        ),
      };
    }
    case GET_SHOPPING_CART_ITEM_LIST_FAILURE: {
      return {
        ...state,
        shoppingCartItemList: reducerUtils.failure([], action.payload),
      };
    }

    case TOGGLE_SHOPPING_CART_ITEM: {
      const changedShoppingCartItemList = state.shoppingCartItemList.data.map((shoppingCartItem) => {
        if (shoppingCartItem.cart_id === action.payload) {
          return {
            ...shoppingCartItem,
            isChecked: !shoppingCartItem.isChecked,
          };
        }

        return shoppingCartItem;
      });

      const isAllShoppingCartItemChecked =
        changedShoppingCartItemList.length ===
        changedShoppingCartItemList.filter((shoppingCartItem) => shoppingCartItem.isChecked).length;

      return {
        ...state,
        shoppingCartItemList: reducerUtils.success(changedShoppingCartItemList),
        isAllShoppingCartItemChecked,
      };
    }

    case TOGGLE_ALL_SHOPPING_CART_ITEM: {
      const changedShoppingCartItemList = state.shoppingCartItemList.data.map((shoppingCartItem) => ({
        ...shoppingCartItem,
        isChecked: !state.isAllShoppingCartItemChecked,
      }));

      return {
        ...state,
        shoppingCartItemList: reducerUtils.success(changedShoppingCartItemList),
        isAllShoppingCartItemChecked: !state.isAllShoppingCartItemChecked,
      };
    }

    case INCREASE_COUNT: {
      const changedShoppingCartItemList = state.shoppingCartItemList.data.map((shoppingCartItem) => {
        if (shoppingCartItem.cart_id === action.payload) {
          return {
            ...shoppingCartItem,
            count: shoppingCartItem.count + 1,
          };
        }
        return shoppingCartItem;
      });

      return {
        ...state,
        shoppingCartItemList: reducerUtils.success(changedShoppingCartItemList),
      };
    }

    case DECREASE_COUNT: {
      const changedShoppingCartItemList = state.shoppingCartItemList.data.map((shoppingCartItem) => {
        if (shoppingCartItem.cart_id === action.payload) {
          return {
            ...shoppingCartItem,
            count: shoppingCartItem.count - 1,
          };
        }
        return shoppingCartItem;
      });

      return {
        ...state,
        shoppingCartItemList: reducerUtils.success(changedShoppingCartItemList),
      };
    }
    default:
      return state;
  }
};

export default shoppingCartReducers;
