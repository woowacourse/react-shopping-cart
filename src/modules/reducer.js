import { dummyProductList } from 'dummy_data';

export const PUT = 'cart/PUT';
export const INCREMENT = 'cart/INCREMENT';
export const DECREMENT = 'cart/DECREMENT';

const initState = {
  products: [...dummyProductList],
  shoppingCart: [],
};

function reducer(state = initState, action) {
  switch (action.type) {
    case PUT:
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
