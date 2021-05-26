import produce from 'immer';
import { CartProductDetailObjectType, CartProductDetailType } from '../../type';
import {
  ADD_SHOPPING_CART_ITEMS,
  CHECK_PRODUCT,
  DECREASE_PRODUCT_AMOUNT,
  INCREASE_PRODUCT_AMOUNT,
  REMOVE_SHOPPING_CART_ITEMS,
  UNCHECK_PRODUCT,
} from '../actionType';

interface StateProps {
  products: CartProductDetailObjectType;
}

const initState: StateProps = {
  products: {},
};

const myShoppingCartReducer = (
  state = initState,
  action: {
    type: string;
    payload: CartProductDetailType;
  }
) => {
  switch (action.type) {
    case ADD_SHOPPING_CART_ITEMS: {
      const product = action.payload;

      return produce(state, (draft) => {
        draft.products[product.product_id] = product;
      });
    }
    case REMOVE_SHOPPING_CART_ITEMS: {
      const product = action.payload;

      return produce(state, (draft) => {
        delete draft.products[product.product_id];
      });
    }
    case INCREASE_PRODUCT_AMOUNT: {
      const product = action.payload;

      return produce(state, (draft) => {
        draft.products[product.product_id].quantity += 1;
      });
    }
    case DECREASE_PRODUCT_AMOUNT: {
      const product = action.payload;

      if (product.quantity === 1) return state;

      return produce(state, (draft) => {
        draft.products[product.product_id].quantity -= 1;
      });
    }
    case CHECK_PRODUCT: {
      const product = action.payload;

      return produce(state, (draft) => {
        draft.products[product.product_id].checked = true;
      });
    }
    case UNCHECK_PRODUCT: {
      const product = action.payload;

      return produce(state, (draft) => {
        draft.products[product.product_id].checked = false;
      });
    }

    default:
      return state;
  }
};

export default myShoppingCartReducer;
