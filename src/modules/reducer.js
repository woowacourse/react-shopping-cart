const PUT = 'cart/PUT';
const INCREMENT = 'cart/INCREMENT';
const DECREMENT = 'cart/DECREMENT';

const initState = {
  products: [],
  shoppingCart: [],
};

function reducer(state = initState, action) {
  switch (action.type) {
    case PUT:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.id ? { ...product, isInCart: true } : product,
        ),
        shoppingCart: state.shoppingCart.concat({ id: action.id, quantity: 1 }),
      };
    case INCREMENT:
      return {
        ...state,
        shoppingCart: state.shoppingCart.map(product =>
          product.id === action.id ? { ...product, quantity: product.quantity + 1 } : product,
        ),
      };
    case DECREMENT:
      return {
        ...state,
        shoppingCart: state.shoppingCart.map(product =>
          product.id === action.id ? { ...product, quantity: product.quantity - 1 } : product,
        ),
      };
    default:
      return state;
  }
}

export default reducer;
