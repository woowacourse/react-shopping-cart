const REQUEST_PRODUCTS_ADD = 'REQUEST_PRODUCTS_ADD';

export const requestProductsAdd = (products) => ({ type: REQUEST_PRODUCTS_ADD, products });

const initialState = {
  products: [],
};

export default function product(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PRODUCTS_ADD:
      return {
        ...state,
        products: action.products,
      };
    default:
      return state;
  }
}
