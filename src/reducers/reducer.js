import { CART_ACTIONS, PRODUCT_LIST_ACTIONS, ORDER_ACTIONS } from 'actions/action';

const initState = {
  products: [],
  shoppingCart: [],
  order: [],
};

function reducer(state = initState, action) {
  switch (action.type) {
    case PRODUCT_LIST_ACTIONS.INITIALIZE:
      return {
        ...state,
        products: [...action.products],
      };

    case CART_ACTIONS.PUT:
      const isExist = state.shoppingCart.some(product => product.id === action.id);

      return {
        ...state,
        shoppingCart: isExist
          ? state.shoppingCart.map(product =>
              product.id === action.id ? { ...product, quantity: action.quantity } : product,
            )
          : state.shoppingCart.concat({ id: action.id, quantity: action.quantity }),
        order: isExist ? state.order : [...state.order, action.id],
      };

    case CART_ACTIONS.DELETE:
      return {
        ...state,
        shoppingCart: state.shoppingCart.filter(product => product.id !== action.id),
        order: state.order.filter(productId => productId !== action.id),
      };

    case CART_ACTIONS.SELECTIVE_DELETE:
      return {
        ...state,
        shoppingCart: state.shoppingCart.filter(product => !state.order.includes(product.id)),
        order: [],
      };

    case ORDER_ACTIONS.ADD:
      return {
        ...state,
        order: [...state.order, action.id],
      };

    case ORDER_ACTIONS.DELETE:
      return {
        ...state,
        order: state.order.filter(productId => productId !== action.id),
      };

    case ORDER_ACTIONS.INITIALIZE:
      return {
        ...state,
        order: [],
      };

    default:
      return state;
  }
}

export default reducer;
