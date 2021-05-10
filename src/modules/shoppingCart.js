const INSERT_SHOPPING_CART_ITEM = 'shoppingCart/INSERT_SHOPPING_CART_ITEM';
const FETCH_SHOPPING_CART_LIST = 'shoppingCart/FETCH_SHOPPING_CART_LIST';
const TOGGLE_SHOPPING_CART_ITEM = 'shoppingCart/TOGGLE_SHOPPING_CART_ITEM';

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

const initialState = {
  shoppingCartList: [],
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
    case TOGGLE_SHOPPING_CART_ITEM: {
      return {
        ...state,
        shoppingCartList: [
          ...state.shoppingCartList.map((shoppingCartItem) => {
            if (shoppingCartItem.id === action.payload) {
              return {
                ...shoppingCartItem,
                isChecked: !shoppingCartItem.isChecked,
              };
            }

            return shoppingCartItem;
          }),
        ],
      };
    }
    default:
      return state;
  }
};

export default shoppingCart;
