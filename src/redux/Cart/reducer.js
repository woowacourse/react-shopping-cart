import {
  ADD_TO_CART_SUCCESS,
  CHANGE_ALL_CHECKBOXES_IN_CART,
  REMOVE_PRODUCT_SUCCESS,
  REMOVE_CHECKED_PRODUCTS_SUCCESS,
  TOGGLE_CART_CHECKBOX,
} from './actions';

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART_SUCCESS:
      return [...state, action.product];

    case TOGGLE_CART_CHECKBOX:
      return state.map((product) =>
        product.id === action.productId ? { ...product, isChecked: !product.isChecked } : product
      );

    case CHANGE_ALL_CHECKBOXES_IN_CART:
      return state.map((product) => ({ ...product, isChecked: action.toCheck }));

    case REMOVE_CHECKED_PRODUCTS_SUCCESS:
      return state.filter((product) => !product.isChecked);

    case REMOVE_PRODUCT_SUCCESS:
      return state.filter((product) => product.id !== action.productId);

    default:
      return state;
  }
};

export default cartReducer;
