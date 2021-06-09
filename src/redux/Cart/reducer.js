import {
  GET_CART_PENDING,
  GET_CART_SUCCESS,
  GET_CART_ERROR,
  ADD_TO_CART_PENDING,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_ERROR,
  TOGGLE_ALL_CHECKBOXES_IN_CART,
  REMOVE_PRODUCT_SUCCESS,
  REMOVE_CHECKED_PRODUCTS_SUCCESS,
  TOGGLE_CART_CHECKBOX,
  CHANGE_QUANTITY,
  RESET_CART,
} from './actions';

const initState = {
  cartList: [],
  isLoading: false,
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_CART_PENDING:
      return {
        ...state,
        isLoading: true,
      };

    case GET_CART_SUCCESS:
      return {
        cartList: action.payload,
        isLoading: false,
      };

    case GET_CART_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case ADD_TO_CART_PENDING:
      return {
        ...state,
        isLoading: true,
      };

    case ADD_TO_CART_SUCCESS:
      return {
        cartList: [...state.cartList, action.cartItem],
        isLoading: false,
      };

    case ADD_TO_CART_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case TOGGLE_CART_CHECKBOX:
      return {
        ...state,
        cartList: state.cartList.map((product) =>
          product.cart_id === action.cartId ? { ...product, isChecked: !product.isChecked } : product
        ),
      };

    case TOGGLE_ALL_CHECKBOXES_IN_CART:
      return {
        ...state,
        cartList: state.cartList.map((product) => ({ ...product, isChecked: action.toCheck })),
      };

    case REMOVE_CHECKED_PRODUCTS_SUCCESS:
      return {
        cartList: state.cartList.filter((product) => !product.isChecked),
        isLoading: false,
      };

    case REMOVE_PRODUCT_SUCCESS:
      return {
        cartList: state.cartList.filter((product) => product.cart_id !== action.cartId),
        isLoading: false,
      };

    case CHANGE_QUANTITY:
      return {
        ...state,
        cartList: state.cartList.map((product) =>
          product.cart_id === action.cartId ? { ...product, quantity: action.quantity } : product
        ),
      };

    case RESET_CART:
      return initState;

    default:
      return state;
  }
};

export default cartReducer;
