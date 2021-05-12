import { PRODUCTS } from '../constants/actionType';

const initialState = {
  pickedProducts: {},
};

const toggleCheckedAll = (products, isChecked) => {
  const newProducts = {};

  Object.values(products).forEach(product => {
    newProducts[product.id] = {
      ...product,
      isChecked: !isChecked,
    };
  });

  return newProducts;
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

    case PRODUCTS.TOGGLE_CHECKED:
      return {
        ...state,
        pickedProducts: {
          ...state.pickedProducts,
          [action.id]: {
            ...state.pickedProducts[action.id],
            isChecked: !state.pickedProducts[action.id].isChecked,
          },
        },
      };

    case PRODUCTS.TOGGLE_ENTIRE_CHECKED:
      return {
        ...state,
        pickedProducts: toggleCheckedAll(
          state.pickedProducts,
          action.isChecked
        ),
      };

    default:
      return state;
  }
};

export default productReducer;
