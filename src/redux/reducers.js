import {
  GET_PRODUCT_LIST_START,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_ERROR,
  ADD_PRODUCT_TO_CART,
  TOGGLE_CART_ITEM_CHECK_BUTTON,
  UNCHECK_ALL_CHECK_BUTTON,
  CHECK_ALL_CHECK_BUTTON,
} from "./types";

export const productListInitialState = {
  productList: {
    loading: false,
    data: null,
    error: null,
  },
};

export const productListReducer = (state = productListInitialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_LIST_START:
      return {
        ...state,
        productList: {
          loading: true,
          data: null,
          error: null,
        },
      };

    case GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        productList: {
          loading: false,
          data: JSON.parse(action.payload),
          error: null,
        },
      };

    case GET_PRODUCT_LIST_ERROR:
      return {
        ...state,
        productList: {
          loading: false,
          data: null,
          error: action.payload.message,
        },
      };

    default: {
      return state;
    }
  }
};

export const cartListInitialState = [];

export const cartListReducer = (state = cartListInitialState, action) => {
  const newState = [...state];

  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      const isExistInCart = state.some((item) => {
        return item.id === action.payload.id;
      });

      if (isExistInCart) {
        return state;
      }
      return [...state, { ...action.payload, quantity: 1, checked: true }];

    case TOGGLE_CART_ITEM_CHECK_BUTTON:
      const selectedItem = newState.find((item) => item.id === action.payload);
      const selectedItemIndex = newState.indexOf(selectedItem);

      newState[selectedItemIndex].checked =
        !newState[selectedItemIndex].checked;

      return newState;

    case UNCHECK_ALL_CHECK_BUTTON:
      const allUnCheckedState = newState.map((item) => {
        return item.checked === true
          ? { ...item, checked: false }
          : { ...item };
      });

      return allUnCheckedState;

    case CHECK_ALL_CHECK_BUTTON:
      const allCheckedState = newState.map((item) => {
        return item.checked === false
          ? { ...item, checked: true }
          : { ...item };
      });

      return allCheckedState;

    default:
      return state;
  }
};
