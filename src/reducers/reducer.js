import { CART_ACTIONS, PRODUCT_LIST_ACTIONS } from 'actions/action';

const initState = {
  products: [],
  shoppingCart: [],
};

function reducer(state = initState, action) {
  switch (action.type) {
    case PRODUCT_LIST_ACTIONS.INITIALIZE:
      return {
        ...state,
        products: [...action.products],
      };

    case CART_ACTIONS.PUT:
      const isExist = state.shoppingCart.find(product => product.id === action.id);

      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.id ? { ...product, isInCart: true } : product,
        ),
        shoppingCart: isExist
          ? state.shoppingCart.map(product =>
              product.id === action.id ? { ...product, quantity: action.quantity } : product,
            )
          : state.shoppingCart.concat({ id: action.id, quantity: action.quantity }),
      };

    default:
      return state;
  }
}

export default reducer;
