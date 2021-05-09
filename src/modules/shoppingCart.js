const INSERT_PRODUCT = 'shoppingCart/INSERT_PRODUCT';
const FETCH_SHOPPING_CART_LIST = 'shoppingCart/FETCH_SHOPPING_CART_LIST';

export const insertShoppingCartItem = (shoppingCartItem) => ({
  type: INSERT_PRODUCT,
  payload: shoppingCartItem,
});

export const fetchShoppingCartList = (shoppingCartList) => ({
  type: FETCH_SHOPPING_CART_LIST,
  payload: shoppingCartList,
});

const initialState = {
  shoppingCartList: [],
};

const shoppingCart = (state = initialState, action) => {
  switch (action.type) {
    case INSERT_PRODUCT:
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
    default:
      return state;
  }
};

export default shoppingCart;
