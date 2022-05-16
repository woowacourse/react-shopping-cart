import { PUT, INITIALIZE } from 'actions/action';

const initState = {
  products: [],
  shoppingCart: [],
};

function reducer(state = initState, action) {
  switch (action.type) {
    case INITIALIZE:
      return {
        ...state,
        products: [...action.products],
      };

    case PUT:
      const isExist = state.shoppingCart.some(product => product.id === action.id);

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
