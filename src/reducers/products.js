import { PRODUCTS } from '../constants/actionType';

const initialState = {
  pickedProducts: {},
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS.ADD_TO_CART:
      return {
        ...state,
        pickedProducts: {
          ...state.pickedProducts,
          [action.product.id]: {
            ...action.product,
            quantity:
              action.product.id in state.pickedProducts
                ? state.pickedProducts[action.product.id].quantity + 1
                : 1, //TODO: refactoring
            isChecked: true,
          },
        },
      };

    case PRODUCTS.INCREASE_QUANTITY:
      return {
        ...state,
        pickedProducts: {
          ...state.pickedProducts,
          [action.id]: {
            ...state.pickedProducts[action.id],
            quantity: state.pickedProducts[action.id].quantity + 1,
          },
        },
      };

    case PRODUCTS.DECREASE_QUANTITY:
      return {
        ...state,
        pickedProducts: {
          ...state.pickedProducts,
          [action.id]: {
            ...state.pickedProducts[action.id],
            quantity:
              state.pickedProducts[action.id].quantity === 1
                ? 1
                : state.pickedProducts[action.id].quantity - 1,
          },
        },
      };

    default:
      return state;
  }
};

export default productReducer;
