import { httpClient } from '../request/httpClient';

// TODO: LIST -> ITEM_LIST 또는 페이지 이름을 변경
const INSERT_SHOPPING_CART_ITEM = 'shoppingCart/INSERT_SHOPPING_CART_ITEM';
const DELETE_SHOPPING_CART_ITEM = 'shoppingCart/DELETE_SHOPPING_CART_ITEM';
const DELETE_CHECKED_SHOPPING_CART_LIST = 'shoppingCart/DELETE_CHECKED_SHOPPING_CART_LIST';
const FETCH_SHOPPING_CART_LIST = 'shoppingCart/FETCH_SHOPPING_CART_LIST';
const TOGGLE_SHOPPING_CART_ITEM = 'shoppingCart/TOGGLE_SHOPPING_CART_ITEM';
const TOGGLE_ALL_SHOPPING_CART_ITEM = 'shoppingCart/TOGGLE_ALL_SHOPPING_CART_ITEM';
const INCREASE_COUNT = 'shoppingCart/INCREASE_COUNT';
const DECREASE_COUNT = 'shoppingCart/DECREASE_COUNT';

export const insertShoppingCartItem = (shoppingCartItem) => async (dispatch) => {
  try {
    await httpClient.post({ path: 'shoppingCartList', body: shoppingCartItem });

    dispatch({ type: INSERT_SHOPPING_CART_ITEM, payload: shoppingCartItem });
  } catch (error) {
    console.error(error);
  }
};

export const deleteShoppingCartItem = (shoppingCartItemId) => async (dispatch) => {
  try {
    await httpClient.delete({ path: `shoppingCartList/${shoppingCartItemId}` });

    dispatch({ type: DELETE_SHOPPING_CART_ITEM, payload: shoppingCartItemId });
  } catch (error) {
    console.error(error);
  }
};

export const deleteCheckedShoppingCartList = (checkedShoppingCartList) => async (dispatch) => {
  try {
    await Promise.all(checkedShoppingCartList.map(({ id }) => httpClient.delete({ path: `shoppingCartList/${id}` })));

    dispatch({ type: DELETE_CHECKED_SHOPPING_CART_LIST });
  } catch (error) {
    console.error(error);
  }
};

export const fetchShoppingCartList = () => async (dispatch) => {
  try {
    const shoppingCartList = await httpClient.get({ path: 'shoppingCartList', returnType: 'json' });

    dispatch({ type: FETCH_SHOPPING_CART_LIST, payload: shoppingCartList });
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

export const increaseCount = (shoppingCartItemId) => ({
  type: INCREASE_COUNT,
  payload: shoppingCartItemId,
});

export const decreaseCount = (shoppingCartItemId) => ({
  type: DECREASE_COUNT,
  payload: shoppingCartItemId,
});

const initialState = {
  shoppingCartList: [],
  isAllShoppingCartItemChecked: true,
};

const shoppingCart = (state = initialState, action) => {
  switch (action.type) {
    case INSERT_SHOPPING_CART_ITEM:
      return {
        ...state,
        shoppingCartList: [...state.shoppingCartList, action.payload],
      };
    case DELETE_SHOPPING_CART_ITEM:
      return {
        ...state,
        shoppingCartList: state.shoppingCartList.filter((shoppingCartItem) => shoppingCartItem.id !== action.payload),
      };
    case DELETE_CHECKED_SHOPPING_CART_LIST:
      return {
        ...state,
        shoppingCartList: state.shoppingCartList.filter((shoppingCartItem) => !shoppingCartItem.isChecked),
      };
    case FETCH_SHOPPING_CART_LIST: {
      return {
        ...state,
        shoppingCartList: action.payload,
      };
    }
    case TOGGLE_SHOPPING_CART_ITEM: {
      const changedShoppingCartList = state.shoppingCartList.map((shoppingCartItem) => {
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
    case INCREASE_COUNT: {
      return {
        ...state,
        shoppingCartList: state.shoppingCartList.map((shoppingCartItem) => {
          if (shoppingCartItem.id === action.payload) {
            return {
              ...shoppingCartItem,
              count: shoppingCartItem.count + 1,
            };
          }
          return shoppingCartItem;
        }),
      };
    }
    case DECREASE_COUNT: {
      return {
        ...state,
        shoppingCartList: state.shoppingCartList.map((shoppingCartItem) => {
          if (shoppingCartItem.id === action.payload) {
            return {
              ...shoppingCartItem,
              count: shoppingCartItem.count - 1,
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
