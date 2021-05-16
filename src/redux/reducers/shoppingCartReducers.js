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
  shoppingCartList: reducerUtils.initial([]),
  isAllShoppingCartItemChecked: true,
};

const shoppingCartReducers = (state = initialState, action) => {
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

export default shoppingCartReducers;
