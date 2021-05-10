const INSERT_SHOPPING_CART_ITEM = 'shoppingCart/INSERT_SHOPPING_CART_ITEM';
const FETCH_SHOPPING_CART_LIST = 'shoppingCart/FETCH_SHOPPING_CART_LIST';
const TOGGLE_SHOPPING_CART_ITEM = 'shoppingCart/TOGGLE_SHOPPING_CART_ITEM';
const TOGGLE_ALL_SHOPPING_CART_ITEM = 'shoppingCart/TOGGLE_ALL_SHOPPING_CART_ITEM';

// TODO: payload or 우리가 원하는 키 주기
export const insertShoppingCartItem = (shoppingCartItem) => ({
  type: INSERT_SHOPPING_CART_ITEM,
  payload: shoppingCartItem,
});

export const fetchShoppingCartList = (shoppingCartList) => ({
  type: FETCH_SHOPPING_CART_LIST,
  payload: shoppingCartList,
});

export const toggleShoppingCartItem = (shoppingCartItemId) => ({
  type: TOGGLE_SHOPPING_CART_ITEM,
  payload: shoppingCartItemId,
});

export const toggleAllShoppingCartItem = () => ({
  type: TOGGLE_ALL_SHOPPING_CART_ITEM,
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
        shoppingCartList: [
          ...state.shoppingCartList.map((shoppingCartItem) => ({
            ...shoppingCartItem,
            isChecked: !state.isAllShoppingCartItemChecked,
          })),
        ],
        isAllShoppingCartItemChecked: !state.isAllShoppingCartItemChecked,
      };
    }
    default:
      return state;
  }
};

export default shoppingCart;
