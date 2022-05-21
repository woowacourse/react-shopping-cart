import ACTION_TYPE from 'redux/cart/cartActions';
import { getObjectArrayValues } from 'utils';

const initialState = {
  products: [],
};

const cartReducer = (state = initialState, action) => {
  const { products } = state;
  const newState = { ...state };

  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPE.ADD_PRODUCT_TO_CART: {
      const cartProductIds = getObjectArrayValues(products, 'id');
      const targetProductIdx = cartProductIds.indexOf(payload.id);

      if (targetProductIdx !== -1) {
        const newProducts = [...products];

        newProducts[targetProductIdx].quantity += 1;
        newState.products = [...newProducts];

        return newState;
      }

      newState.products = [...products, { ...payload, quantity: 1 }];

      return newState;
    }
    case ACTION_TYPE.SUBTRACT_CART_PRODUCT_QUANTITY: {
      const cartProductIds = getObjectArrayValues(products, 'id');
      const targetProductIdx = cartProductIds.indexOf(payload.id);
      const newProducts = [...products];

      newProducts[targetProductIdx].quantity -= 1;
      newState.products = [...newProducts];

      return newState;
    }
    default:
      return state;
  }
};

export default cartReducer;
