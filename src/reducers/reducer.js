import {
  CART_DELETE,
  CART_INITIALIZE,
  CART_PUT,
  CART_SELECT,
  PRODUCT_INITIALIZE,
} from 'actions/action';
import { deleteShoppingCartItem, postShoppingCartItem, putShoppingCartItem } from 'utils/api';

const initState = {
  products: [],
  shoppingCart: [],
};

function reducer(state = initState, action) {
  const targetItem = state.products.find(product => product.id === action.id);

  switch (action.type) {
    case PRODUCT_INITIALIZE:
      return {
        ...state,
        products: [...action.products],
      };

    case CART_INITIALIZE:
      return {
        ...state,
        shoppingCart: [...action.shoppingCart],
      };

    case CART_PUT:
      const isExist = state.shoppingCart.some(product => product.id === action.id);
      let shoppingCartItem;

      if (targetItem !== undefined) {
        shoppingCartItem = { ...targetItem, quantity: action.quantity, isSelect: action.isSelect };
        if (isExist) {
          postShoppingCartItem(shoppingCartItem);
        } else {
          putShoppingCartItem(shoppingCartItem);
        }
      }

      return {
        ...state,
        shoppingCart: isExist
          ? state.shoppingCart.map(product =>
              product.id === action.id ? { ...shoppingCartItem } : product,
            )
          : state.shoppingCart.concat({ ...shoppingCartItem }),
      };

    case CART_DELETE:
      if (targetItem !== undefined) {
        deleteShoppingCartItem(targetItem);
      }

      return {
        ...state,
        shoppingCart: state.shoppingCart.filter(product => product.id !== action.id),
      };

    case CART_SELECT:
      return;

    default:
      return state;
  }
}

export default reducer;
