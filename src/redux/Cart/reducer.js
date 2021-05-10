import { ADD_TO_CART_SUCCESS, CHANGE_ALL_CHECKBOXES_IN_CART, TOGGLE_CART_CHECKBOX } from './actions';

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

    default:
      return state;
  }
};

export default cartReducer;
