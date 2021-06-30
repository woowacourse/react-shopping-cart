import { API_PATH, RETURN_TYPE } from '../constants/api';
import { httpClient } from '../request/httpClient';

const INSERT_SHOPPING_CART_ITEM = 'shoppingCart/INSERT_SHOPPING_CART_ITEM';
const DELETE_SHOPPING_CART_ITEM = 'shoppingCart/DELETE_SHOPPING_CART_ITEM';
const DELETE_CHECKED_SHOPPING_CART_LIST = 'shoppingCart/DELETE_CHECKED_SHOPPING_CART_LIST';
const FETCH_SHOPPING_CART_LIST = 'shoppingCart/FETCH_SHOPPING_CART_LIST';
const TOGGLE_SHOPPING_CART_ITEM = 'shoppingCart/TOGGLE_SHOPPING_CART_ITEM';
const TOGGLE_ALL_SHOPPING_CART_ITEM = 'shoppingCart/TOGGLE_ALL_SHOPPING_CART_ITEM';
const INCREASE_QUANTITY = 'shoppingCart/INCREASE_QUANTITY';
const DECREASE_QUANTITY = 'shoppingCart/DECREASE_QUANTITY';

export const fetchShoppingCartList = () => async (dispatch) => {
  try {
    const shoppingCartList = await httpClient.get({ path: API_PATH.SHOPPING_CART_LIST, returnType: RETURN_TYPE.JSON });

    dispatch({ type: FETCH_SHOPPING_CART_LIST, payload: shoppingCartList });
  } catch (error) {
    console.error(error);
  }
};

export const insertShoppingCartItem = (shoppingCartItem) => async (dispatch) => {
  try {
    await httpClient.post({ path: API_PATH.SHOPPING_CART_LIST, body: shoppingCartItem });

    dispatch({ type: INSERT_SHOPPING_CART_ITEM, payload: shoppingCartItem });
  } catch (error) {
    console.error(error);
  }
};

export const deleteShoppingCartItem = (shoppingCartItemId) => async (dispatch) => {
  try {
    await httpClient.delete({ path: `${API_PATH.SHOPPING_CART_LIST}/${shoppingCartItemId}` });

    dispatch({ type: DELETE_SHOPPING_CART_ITEM, payload: shoppingCartItemId });
  } catch (error) {
    console.error(error);
  }
};

export const deleteCheckedShoppingCartList = (checkedShoppingCartList) => async (dispatch) => {
  try {
    await Promise.all(
      checkedShoppingCartList.map(({ cart_id }) =>
        httpClient.delete({ path: `${API_PATH.SHOPPING_CART_LIST}/${cart_id}` })
      )
    );

    dispatch({ type: DELETE_CHECKED_SHOPPING_CART_LIST });
  } catch (error) {
    console.error(error);
  }
};

export const toggleShoppingCartItem = (shoppingCartItemId) => ({
  type: TOGGLE_SHOPPING_CART_ITEM,
  payload: shoppingCartItemId,
});

export const toggleAllShoppingCartItem = () => ({
  type: TOGGLE_ALL_SHOPPING_CART_ITEM,
});

export const increaseQuantity = (shoppingCartItemId) => {
  return {
    type: INCREASE_QUANTITY,
    payload: shoppingCartItemId,
  };
};

export const decreaseQuantity = (shoppingCartItemId) => ({
  type: DECREASE_QUANTITY,
  payload: shoppingCartItemId,
});

const initialState = {
  shoppingCartList: [],
  isAllShoppingCartItemChecked: true,
};

const shoppingCart = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHOPPING_CART_LIST: {
      return {
        ...state,
        shoppingCartList: action.payload.map((item) => ({
          ...item,
          quantity: 1,
          isChecked: true,
        })),
      };
    }
    case INSERT_SHOPPING_CART_ITEM:
      return {
        ...state,
        shoppingCartList: [...state.shoppingCartList, action.payload],
      };
    case DELETE_SHOPPING_CART_ITEM:
      return {
        ...state,
        shoppingCartList: state.shoppingCartList.filter(
          (shoppingCartItem) => shoppingCartItem.cart_id !== action.payload
        ),
      };
    case DELETE_CHECKED_SHOPPING_CART_LIST:
      return {
        ...state,
        shoppingCartList: state.shoppingCartList.filter((shoppingCartItem) => !shoppingCartItem.isChecked),
      };
    case TOGGLE_SHOPPING_CART_ITEM: {
      const changedShoppingCartList = state.shoppingCartList.map((shoppingCartItem) => {
        if (shoppingCartItem.cart_id === action.payload) {
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
        shoppingCartList: changedShoppingCartList,
        isAllShoppingCartItemChecked,
      };
    }
    case TOGGLE_ALL_SHOPPING_CART_ITEM: {
      return {
        ...state,
        shoppingCartList: state.shoppingCartList.map((shoppingCartItem) => ({
          ...shoppingCartItem,
          isChecked: !state.isAllShoppingCartItemChecked,
        })),
        isAllShoppingCartItemChecked: !state.isAllShoppingCartItemChecked,
      };
    }
    case INCREASE_QUANTITY: {
      return {
        ...state,
        shoppingCartList: state.shoppingCartList.map((shoppingCartItem) => {
          if (shoppingCartItem.cart_id === action.payload) {
            return {
              ...shoppingCartItem,
              quantity: shoppingCartItem.quantity + 1,
            };
          }
          return shoppingCartItem;
        }),
      };
    }
    case DECREASE_QUANTITY: {
      return {
        ...state,
        shoppingCartList: state.shoppingCartList.map((shoppingCartItem) => {
          if (shoppingCartItem.cart_id === action.payload) {
            return {
              ...shoppingCartItem,
              quantity: shoppingCartItem.quantity - 1,
            };
          }
          return shoppingCartItem;
        }),
      };
    }
    default:
      return state;
  }
};

export default shoppingCart;
