import ACTION_TYPE from 'redux/cart/cartActions';
import { getObjectArrayIdxOfValue, getObjectArrayValuesOfKey, isArrayIncludesObject } from 'utils';

const initialState = {
  products: [],
  checkedProducts: [],
  isAllProductsChecked: true,
  clicker: false,
};

const cartReducer = (state = initialState, action) => {
  const { products, checkedProducts } = state;
  const { type, payload } = action;

  const newState = { ...state };

  switch (type) {
    case ACTION_TYPE.ADD_PRODUCT_TO_CART: {
      const newProducts = [...products];
      const targetProductIdx = getObjectArrayIdxOfValue(products, { key: 'id', value: payload.id });

      if (targetProductIdx !== -1) {
        newProducts[targetProductIdx].quantity += 1;
        newState.products = [...newProducts];

        return newState;
      }

      newState.products = [...products, { ...payload, quantity: 1 }];
      newState.checkedProducts = [...checkedProducts, { id: payload.id }];

      return newState;
    }
    case ACTION_TYPE.SUBTRACT_CART_PRODUCT_QUANTITY: {
      const newProducts = [...products];
      const targetProductIdx = getObjectArrayIdxOfValue(products, { key: 'id', value: payload.id });

      newProducts[targetProductIdx].quantity -= 1;
      newState.products = [...newProducts];

      return newState;
    }
    case ACTION_TYPE.TOGGLE_ALL_CART_PRODUCTS_CHECK: {
      newState.isAllProductsChecked = payload.checked;
      newState.clicker = !state.clicker;

      if (!payload.checked) {
        newState.checkedProducts = [];

        return newState;
      }

      newState.checkedProducts = [...products];

      return newState;
    }
    case ACTION_TYPE.TOGGLE_CART_PRODUCT_CHECK: {
      const isCheckedProduct = isArrayIncludesObject(checkedProducts, {
        key: 'id',
        value: payload.id,
      });

      if (isCheckedProduct) {
        newState.checkedProducts = checkedProducts.filter(product => product.id !== payload.id);

        return newState;
      }

      newState.checkedProducts = [...checkedProducts, { id: payload.id }];

      return newState;
    }
    case ACTION_TYPE.REMOVE_SELECTED_PRODUCTS_FROM_CART: {
      const checkedProductIds = getObjectArrayValuesOfKey(checkedProducts, 'id');

      newState.products = products.filter(product => !checkedProductIds.includes(product.id));
      newState.checkedProducts = [];

      return newState;
    }
    case ACTION_TYPE.REMOVE_PRODUCT_FROM_CART: {
      newState.products = products.filter(product => product.id !== payload.id);
      newState.checkedProducts = checkedProducts.filter(product => product.id !== payload.id);

      return newState;
    }
    default:
      return state;
  }
};

export default cartReducer;

export { initialState };
