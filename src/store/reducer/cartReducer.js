import { CART_ACTION_TYPES } from 'store/action/cartActions';

const InitialCartedProducts = [];

const isSameProduct = (action, product) =>
  action.payload.product.id === product.id && action.payload.product.name === product.name;

const cartReducer = (state = InitialCartedProducts, action) => {
  switch (action.type) {
    case CART_ACTION_TYPES.ADD_PRODUCT:
      if (state.some(product => isSameProduct(action, product))) {
        return state.map(product => {
          if (isSameProduct(action, product)) {
            return { ...product, count: product.count + 1 };
          }
          return product;
        });
      }
      return state.concat([{ ...action.payload.product, count: 1, checked: true }]);

    case CART_ACTION_TYPES.SUBTRACT_PRODUCT:
      if (state.some(product => isSameProduct(action, product))) {
        return state.map(product => {
          if (isSameProduct(action, product) && product.count > 1) {
            return { ...product, count: product.count - 1 };
          }
          return product;
        });
      }
      break;

    case CART_ACTION_TYPES.CHECK_PRODUCT:
      if (state.some(product => isSameProduct(action, product))) {
        return state.map(product => {
          if (isSameProduct(action, product)) {
            return { ...product, checked: action.payload.checked };
          }
          return product;
        });
      }
      break;

    case CART_ACTION_TYPES.REMOVE_PRODUCT:
      return state.filter(product => !isSameProduct(action, product));

    default:
      return state;
  }
};

export default cartReducer;
