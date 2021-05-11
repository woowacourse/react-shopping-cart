// TODO: LIST -> ITEM_LIST
const INSERT_SHOPPING_CART_ITEM = 'shoppingCart/INSERT_SHOPPING_CART_ITEM';
const DELETE_SHOPPING_CART_ITEM = 'shoppingCart/DELETE_SHOPPING_CART_ITEM';
const DELETE_CHECKED_SHOPPING_CART_LIST = 'shoppingCart/DELETE_CHECKED_SHOPPING_CART_LIST';
const FETCH_SHOPPING_CART_LIST = 'shoppingCart/FETCH_SHOPPING_CART_LIST';
const TOGGLE_SHOPPING_CART_ITEM = 'shoppingCart/TOGGLE_SHOPPING_CART_ITEM';
const TOGGLE_ALL_SHOPPING_CART_ITEM = 'shoppingCart/TOGGLE_ALL_SHOPPING_CART_ITEM';
const INCREASE_COUNT = 'shoppingCart/INCREASE_COUNT';
const DECREASE_COUNT = 'shoppingCart/DECREASE_COUNT';

// TODO: payload or 우리가 원하는 키 주기
export const insertShoppingCartItem = (shoppingCartItem) => async (dispatch) => {
  await fetch('http://localhost:4000/shoppingCartList', {
    method: 'POST',
    body: JSON.stringify(shoppingCartItem),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  dispatch({ type: INSERT_SHOPPING_CART_ITEM, payload: shoppingCartItem });
};

export const deleteShoppingCartItem = (shoppingCartItemId) => async (dispatch) => {
  try {
    await fetch(`http://localhost:4000/shoppingCartList/${shoppingCartItemId}`, {
      method: 'DELETE',
    });

    dispatch({ type: DELETE_SHOPPING_CART_ITEM, payload: shoppingCartItemId });
  } catch (error) {
    console.error(error);
  }
};

export const deleteCheckedShoppingCartList = (checkedShoppingCartList) => async (dispatch) => {
  try {
    await Promise.all(
      checkedShoppingCartList.map(({ id }) =>
        fetch(`http://localhost:4000/shoppingCartList/${id}`, { method: 'DELETE' })
      )
    );

    dispatch({ type: DELETE_CHECKED_SHOPPING_CART_LIST });
  } catch (error) {
    console.error(error);
  }
};

export const fetchShoppingCartList = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:4000/shoppingCartList');
    const shoppingCartList = await response.json();

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
    // TODO: 알고리즘 수정하기
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
