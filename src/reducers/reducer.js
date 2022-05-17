import { CART_INITIALIZE, CART_PUT, CART_SELECT, PRODUCT_INITIALIZE } from 'actions/action';
import { postShoppingCartItem, putProductItem, putShoppingCartItem } from 'utils/api';

const initState = {
  products: [],
  shoppingCart: [],
};

function reducer(state = initState, action) {
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
      const targetItem = state.products.find(product => product.id === action.id);
      let shoppingCartItem;

      if (targetItem !== undefined) {
        shoppingCartItem = { ...targetItem, quantity: action.quantity, isSelect: false };
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

    case CART_SELECT:
      return;

    default:
      return state;
  }
}

export default reducer;
