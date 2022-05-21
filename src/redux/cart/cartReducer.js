import ACTION_TYPE from 'redux/cart/cartActions';
import { getObjectArrayValues } from 'utils';

const initialState = [];

const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPE.ADD_PRODUCT_TO_SHOPPING_CART: {
      const cartProductIds = getObjectArrayValues(state, 'id');
      const targetProductIdx = cartProductIds.indexOf(payload.id);

      if (targetProductIdx !== -1) {
        const newState = [...state];

        newState[targetProductIdx].quantity += 1;

        return newState;
      }

      return [...state, { ...payload, quantity: 1 }];
    }
    default:
      return state;
  }
};

export default cartReducer;
